import { NextResponse } from 'next/server';
import { getCertificationsContent } from '@/lib/contentLoader';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const certs = getCertificationsContent();
    return NextResponse.json({
      success: true,
      count: certs.length,
      data: certs,
    });
  } catch (error) {
    console.error('[API Certifications Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch certifications' },
      { status: 500 }
    );
  }
}
