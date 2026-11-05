import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const isEmailConfigured = Boolean(process.env.EMAIL_API_KEY);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tutorproctoredexams.com';

    return NextResponse.json({
      status: 'operational',
      timestamp: new Date().toISOString(),
      system: 'TUTOR PROCTORED EXAMS',
      version: '1.0.0',
      integrations: {
        contactApi: 'operational',
        emailProvider: isEmailConfigured ? 'configured' : 'pending_provider_key',
        siteDomain: siteUrl,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', error: 'Health check failed.' },
      { status: 500 }
    );
  }
}
