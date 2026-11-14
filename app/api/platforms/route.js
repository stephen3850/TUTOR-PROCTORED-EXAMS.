import { NextResponse } from 'next/server';
import { getPlatformsContent } from '@/lib/contentLoader';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const platforms = getPlatformsContent();
    return NextResponse.json({
      success: true,
      count: platforms.length,
      data: platforms,
    });
  } catch (error) {
    console.error('[API Platforms Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch exam platforms' },
      { status: 500 }
    );
  }
}
