import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { stripe, STRIPE_PRICE_IDS } from '@/lib/stripe';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req) {
  try {
    const data = await req.json();
    const { priceId, tierType, billingInterval } = data;
    
    // Get the authenticated user
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Validate the price ID
    let selectedPriceId = priceId;
    if (!selectedPriceId) {
      // If no priceId is provided, derive it from tier and interval
      if (tierType === 'PRO') {
        selectedPriceId = billingInterval === 'year' 
          ? STRIPE_PRICE_IDS.PRO_YEARLY
          : STRIPE_PRICE_IDS.PRO_MONTHLY;
      } else if (tierType === 'ENTERPRISE') {
        selectedPriceId = STRIPE_PRICE_IDS.ENTERPRISE;
      } else {
        return NextResponse.json(
          { error: 'Invalid tier type' },
          { status: 400 }
        );
      }
    }
    
    // Connect to the database
    await connectToDatabase();
    
    // Get the user from the database
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Check if user already has a Stripe customer ID
    let customerId = user.subscription?.customerId;
    
    if (!customerId) {
      // Create a new customer in Stripe
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId: user._id.toString(),
          clerkId: user.clerkId,
        },
      });
      
      customerId = customer.id;
      
      // Update the user with the new customer ID
      user.subscription = {
        ...user.subscription,
        customerId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      await user.save();
    }
    
    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: selectedPriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile?canceled=true`,
      subscription_data: {
        metadata: {
          userId: userId,
        },
      },
    });
    
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Subscribe API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 