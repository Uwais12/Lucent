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

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

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
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    });
  }

  const eventType = evt.type;

  try {
    await connectToDatabase();

    if (eventType === 'user.created' || eventType === 'user.updated') {
      const { id, email_addresses, ...attributes } = evt.data;
      
      // Get the primary email
      const primaryEmail = email_addresses?.find(email => email.id === attributes.primary_email_address_id);
      
      const userData = {
        clerkId: id,
        email: primaryEmail?.email_address,
        role: attributes.private_metadata?.role || 'USER',
      };

      // Update or create the user
      await User.findOneAndUpdate(
        { clerkId: id },
        { $set: userData },
        { upsert: true, new: true }
      );
    }

    if (eventType === 'user.deleted') {
      const { id } = evt.data;
      await User.findOneAndDelete({ clerkId: id });
    }

    return new Response('Webhook processed successfully', { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response('Error processing webhook', { status: 500 });
  }
} 