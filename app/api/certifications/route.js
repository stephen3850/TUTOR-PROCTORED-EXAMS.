import { NextResponse } from 'next/server';
import certsData from '@/content/certifications.json';
import { CERTIFICATIONS_DATA } from '@/lib/data/certificationsData';

export async function GET() {
  try {
    const certs = certsData.certifications || Object.values(CERTIFICATIONS_DATA);
    return NextResponse.json({
      success: true,
      count: certs.length,
      data: certs
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch certifications' },
      { status: 500 }
    );
  }
}
