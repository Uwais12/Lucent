import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req) {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature');

  if (!signature) {
    console.error('Missing Stripe signature');
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  try {
    await connectToDatabase();

    console.log(`Processing webhook event: ${event.type}`);

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionChange(event);
        break;
      case 'customer.subscription.deleted':
        await handleSubscriptionCancelled(event);
        break;
      case 'invoice.payment_succeeded':
        await handleInvoicePayment(event);
        break;
      case 'invoice.payment_failed':
        await handleFailedPayment(event);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error(`Error processing webhook: ${error.message}`);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

// Handle subscription changes (create/update)
async function handleSubscriptionChange(event) {
  const subscription = event.data.object;
  const customerId = subscription.customer;
  
  // Determine which plan/tier based on the subscription price
  const priceId = subscription.items.data[0].price.id;
  const tierMapping = {
    [process.env.STRIPE_PRICE_PRO_MONTHLY]: 'PRO',
    [process.env.STRIPE_PRICE_PRO_YEARLY]: 'PRO',
    [process.env.STRIPE_PRICE_ENTERPRISE_YEARLY]: 'ENTERPRISE',
  };
  
  const tier = tierMapping[priceId] || 'PRO';
  
  // Update user with subscription details
  await User.findOneAndUpdate(
    { 'subscription.customerId': customerId },
    {
      $set: {
        'subscription.tier': tier,
        'subscription.status': subscription.status.toUpperCase(),
        'subscription.subscriptionId': subscription.id,
        'subscription.priceId': priceId,
        'subscription.currentPeriodEnd': subscription.current_period_end 
          ? new Date(subscription.current_period_end * 1000) 
          : undefined,
        'subscription.updatedAt': new Date(),
        'subscription.cancelAtPeriodEnd': subscription.cancel_at_period_end,
      },
    },
    { new: true }
  );
  
  console.log(`Updated subscription for customer ${customerId}`);
}

// Handle subscription cancellation
async function handleSubscriptionCancelled(event) {
  const subscription = event.data.object;
  const customerId = subscription.customer;
  
  await User.findOneAndUpdate(
    { 'subscription.customerId': customerId },
    {
      $set: {
        'subscription.tier': 'FREE',
        'subscription.status': 'CANCELED',
        'subscription.updatedAt': new Date(),
      },
    }
  );
  
  console.log(`Cancelled subscription for customer ${customerId}`);
}

// Handle successful invoice payment
async function handleInvoicePayment(event) {
  const invoice = event.data.object;
  const customerId = invoice.customer;
  
  // If this is for a subscription, update the subscription status
  if (invoice.subscription) {
    await User.findOneAndUpdate(
      { 'subscription.customerId': customerId },
      {
        $set: {
          'subscription.status': 'ACTIVE',
          'subscription.updatedAt': new Date(),
        },
      }
    );
    
    console.log(`Updated subscription status for customer ${customerId} after payment`);
  }
}

// Handle failed invoice payment
async function handleFailedPayment(event) {
  const invoice = event.data.object;
  const customerId = invoice.customer;
  
  if (invoice.subscription) {
    await User.findOneAndUpdate(
      { 'subscription.customerId': customerId },
      {
        $set: {
          'subscription.status': 'PAST_DUE',
          'subscription.updatedAt': new Date(),
        },
      }
    );
    
    console.log(`Updated subscription status for customer ${customerId} after failed payment`);
  }
} 