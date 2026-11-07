import { NextResponse } from 'next/server';
import { Resend } from 'resend';

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
    if (fullName.length > 100 || email.length > 150 || message.length > 3000) {
      return NextResponse.json(
        { success: false, error: 'Input limits exceeded. Please shorten your entry.' },
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

    // 5. Input sanitization
    const sanitizedFullName = fullName.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const sanitizedEmail = email.trim();
    const sanitizedSubject = (subject || 'General Inquiry').trim().replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const sanitizedService = (service || 'General Enquiry').trim().replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const sanitizedMessage = message.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // 6. Environment configuration
    const resendApiKey = process.env.RESEND_API_KEY || process.env.EMAIL_API_KEY;
    const receiverEmail = process.env.INQUIRY_RECEIVER_EMAIL || 'info@tutorproctoredexams.com';
    const fromEmail = process.env.INQUIRY_FROM_EMAIL || 'TUTOR PROCTORED EXAMS <onboarding@resend.dev>';

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const emailSubject = `New Website Inquiry – [${sanitizedService}]`;

      const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
          <div style="background-color: #0F172A; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h2 style="color: #ffffff; margin: 0; font-size: 20px;">TUTOR PROCTORED EXAMS</h2>
            <p style="color: #356AE6; margin: 5px 0 0 0; font-size: 13px; font-weight: bold;">New Website Inquiry Notification</p>
          </div>
          <div style="padding: 24px; color: #1e293b;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 140px;"><strong>Full Name:</strong></td>
                <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: bold;">${sanitizedFullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px;"><strong>Customer Email:</strong></td>
                <td style="padding: 8px 0; color: #2563EB; font-size: 14px; font-weight: bold;"><a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px;"><strong>Service of Interest:</strong></td>
                <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${sanitizedService}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px;"><strong>Subject / Exam / Cert:</strong></td>
                <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${sanitizedSubject}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px;"><strong>Submission Date:</strong></td>
                <td style="padding: 8px 0; color: #0f172a; font-size: 13px;">${new Date().toLocaleString('en-US', { timeZone: 'UTC' })} UTC</td>
              </tr>
            </table>

            <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #2563EB;">
              <p style="margin: 0 0 8px 0; color: #64748b; font-size: 12px; font-weight: bold; text-transform: uppercase;">Message & Learning Goals:</p>
              <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${sanitizedMessage}</p>
            </div>

            <div style="margin-top: 24px; padding-top: 16px; border-t: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
              Reply directly to this email to respond to <strong>${sanitizedFullName}</strong> (${sanitizedEmail}).
            </div>
          </div>
        </div>
      `;

      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: receiverEmail,
        reply_to: sanitizedEmail,
        subject: emailSubject,
        html: htmlBody,
      });

      if (error) {
        console.error('[Resend Email Error]:', error);
        return NextResponse.json(
          { success: false, error: `Email delivery failed: ${error.message || 'Unable to send email via Resend.'}` },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Thank you! Your inquiry has been sent directly to our team. An educational specialist will respond within 1 business day.',
        emailId: data?.id,
      });
    }

    // Local Development Fallback Log
    console.log(`[Contact Form Submission - Local Log]`, {
      fullName: sanitizedFullName,
      email: sanitizedEmail,
      service: sanitizedService,
      subject: sanitizedSubject,
      messageLength: sanitizedMessage.length,
      time: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your inquiry has been received. An educational specialist will connect with you shortly.',
    });
  } catch (error) {
    console.error('[Contact API Error]:', error?.message || 'Unexpected error');
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred while submitting your inquiry. Please try again later.' },
      { status: 500 }
    );
  }
}
