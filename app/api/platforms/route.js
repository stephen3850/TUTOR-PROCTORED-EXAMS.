import { NextResponse } from 'next/server';
import platformsData from '@/content/platforms.json';
import { PLATFORMS_DATA } from '@/lib/data/platformsData';

export async function GET() {
  try {
    const platforms = platformsData.platforms || Object.values(PLATFORMS_DATA);
    return NextResponse.json({
      success: true,
      count: platforms.length,
      data: platforms
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch exam platforms' },
      { status: 500 }
    );
  }
}
