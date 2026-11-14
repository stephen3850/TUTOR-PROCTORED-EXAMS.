import { NextResponse } from 'next/server';
import { getServicesContent } from '@/lib/contentLoader';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const services = getServicesContent();
    return NextResponse.json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    console.error('[API Services Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}
