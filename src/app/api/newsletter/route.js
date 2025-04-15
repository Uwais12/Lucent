import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db('lucent');
    const collection = db.collection('newsletter_signups');

    // Check for existing email
    const existingSignup = await collection.findOne({ email });
    if (existingSignup) {
      await client.close();
      return NextResponse.json(
        { error: 'This email is already subscribed to our newsletter' },
        { status: 400 }
      );
    }

    // Save new signup
    await collection.insertOne({
      email,
      signupDate: new Date(),
    });

    await client.close();

    return NextResponse.json(
      { message: 'Successfully signed up for newsletter!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter signup error:', error);
    return NextResponse.json(
      { error: 'Failed to sign up for newsletter' },
      { status: 500 }
    );
  }
} 