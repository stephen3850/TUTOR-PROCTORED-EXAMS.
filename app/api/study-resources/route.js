import { NextResponse } from 'next/server';
import { getStudyResourcesContent } from '@/lib/contentLoader';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const resources = getStudyResourcesContent();
    return NextResponse.json({
      success: true,
      count: resources.length,
      data: resources,
    });
  } catch (error) {
    console.error('[API Study Resources Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch study resources' },
      { status: 500 }
    );
  }
}
