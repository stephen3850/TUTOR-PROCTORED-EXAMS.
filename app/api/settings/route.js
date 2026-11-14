import { NextResponse } from 'next/server';
import { getSiteSettingsContent } from '@/lib/contentLoader';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const settings = getSiteSettingsContent();
    return NextResponse.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error('[API Settings Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch site settings' },
      { status: 500 }
    );
  }
}
