import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, subject, message, type, recipient } = data;

    // Validate required fields
    if (!name || !email || !subject || !message || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // In a production environment, you would integrate with an email 
    // sending service like SendGrid, Mailgun, etc.
    // For now, we'll just log the information
    console.log(`
      Email would be sent to: ${recipient}
      From: ${name} (${email})
      Subject: [${type}] ${subject}
      Message: ${message}
    `);

    // Return success response
    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 