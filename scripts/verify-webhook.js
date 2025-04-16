import dotenv from 'dotenv';
import { Webhook } from 'svix';

// Load environment variables
dotenv.config();

async function verifyWebhookSetup() {
  try {
    // Check if WEBHOOK_SECRET is set
    if (!process.env.WEBHOOK_SECRET) {
      console.error('❌ WEBHOOK_SECRET is not set in environment variables');
      return;
    }

    // Create a test webhook instance
    const wh = new Webhook(process.env.WEBHOOK_SECRET);
    console.log('✅ WEBHOOK_SECRET is valid and webhook instance created successfully');

    // Test payload verification
    const testPayload = {
      type: 'user.created',
      data: {
        id: 'test_id',
        email_addresses: [{
          id: 'test_email_id',
          email_address: 'test@example.com'
        }],
        primary_email_address_id: 'test_email_id'
      }
    };

    const testSignature = wh.sign(JSON.stringify(testPayload));
    console.log('✅ Webhook signing is working');

    // Verify the signature
    try {
      wh.verify(JSON.stringify(testPayload), {
        'svix-id': 'test_id',
        'svix-timestamp': new Date().toISOString(),
        'svix-signature': testSignature
      });
      console.log('✅ Webhook verification is working');
    } catch (error) {
      console.error('❌ Webhook verification failed:', error);
    }

  } catch (error) {
    console.error('❌ Error during webhook verification:', error);
  }
}

verifyWebhookSetup(); 