import { NextResponse } from 'next/server';
import settingsData from '@/content/settings.json';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: settingsData
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch site settings' },
      { status: 500 }
    );
  }
}
