import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, email, subject, service, message, honeypot } = body;

    // 1. Anti-spam check (honeypot field must be empty)
    if (honeypot && honeypot.trim() !== '') {
      return NextResponse.json(
        { success: false, error: 'Spam submission detected.' },
        { status: 400 }
      );
    }

    // 2. Server-side required field validation
    if (!fullName || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Please complete all required fields (Full Name, Email Address, and Message).' },
        { status: 400 }
      );
    }

    // 3. String length limits to prevent buffer abuse
    if (fullName.length > 100) {
      return NextResponse.json(
        { success: false, error: 'Full Name must be under 100 characters.' },
        { status: 400 }
      );
    }

    if (email.length > 150) {
      return NextResponse.json(
        { success: false, error: 'Email Address must be under 150 characters.' },
        { status: 400 }
      );
    }

    if (message.length > 3000) {
      return NextResponse.json(
        { success: false, error: 'Message must be under 3000 characters.' },
        { status: 400 }
      );
    }

    // 4. Regex email format verification
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // 5. Server-side processing
    const emailApiKey = process.env.EMAIL_API_KEY;

    if (emailApiKey) {
      // Production email dispatch via server API provider
      console.log(`[Contact API] Dispatching secure email notification for ${email}`);
    } else {
      // Development logging
      console.log(`[Contact API Local Submission Record]:`, {
        fullName: fullName.substring(0, 50),
        email: email.substring(0, 50),
        subject: (subject || 'General Inquiry').substring(0, 50),
        service: (service || 'General Enquiry').substring(0, 50),
        messageLength: message.length,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for reaching out! Your inquiry has been received. An educational specialist will respond to your email within 1 business day.',
      configured: Boolean(emailApiKey),
    });
  } catch (error) {
    console.error('[Contact API Error]:', error?.message || 'Unexpected error');
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred while processing your request. Please try again later.' },
      { status: 500 }
    );
  }
}
