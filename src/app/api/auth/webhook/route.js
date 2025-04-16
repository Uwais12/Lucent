import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req) {
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out with more details
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('Missing Svix headers:', {
      'svix-id': svix_id ? 'present' : 'missing',
      'svix-timestamp': svix_timestamp ? 'present' : 'missing',
      'svix-signature': svix_signature ? 'present' : 'missing'
    });
    return new Response('Missing required Svix headers', {
      status: 400
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Validate webhook secret
  if (!process.env.WEBHOOK_SECRET) {
    console.error('WEBHOOK_SECRET is not configured');
    return new Response('Server configuration error', {
      status: 500
    });
  }

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(process.env.WEBHOOK_SECRET);

  let evt;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', {
      error: err.message,
      svix_id,
      svix_timestamp,
      payload: JSON.stringify(payload)
    });
    return new Response('Webhook verification failed', {
      status: 400
    });
  }

  const eventType = evt.type;
  console.log('Processing webhook event:', eventType);

  try {
    await connectToDatabase();

    if (eventType === 'user.created' || eventType === 'user.updated') {
      const { id, email_addresses, ...attributes } = evt.data;
      
      // Get the primary email with additional logging
      const primaryEmail = email_addresses?.find(email => email.id === attributes.primary_email_address_id);
      console.log('Processing user data:', {
        userId: id,
        primaryEmailId: attributes.primary_email_address_id,
        foundPrimaryEmail: !!primaryEmail,
        emailAddress: primaryEmail?.email_address
      });
      
      const userData = {
        clerkId: id,
        email: primaryEmail?.email_address,
        role: attributes.private_metadata?.role || 'USER',
      };

      // Update or create the user
      const user = await User.findOneAndUpdate(
        { clerkId: id },
        { $set: userData },
        { upsert: true, new: true }
      );
      
      console.log('User updated successfully:', {
        clerkId: user.clerkId,
        email: user.email,
        role: user.role
      });
    }

    if (eventType === 'user.deleted') {
      const { id } = evt.data;
      await User.findOneAndDelete({ clerkId: id });
      console.log('User deleted successfully:', { clerkId: id });
    }

    return new Response('Webhook processed successfully', { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', {
      error: error.message,
      eventType,
      userId: evt.data?.id
    });
    return new Response('Error processing webhook', { status: 500 });
  }
} 