import { NextResponse } from 'next/server';
import resourcesData from '@/content/study-resources.json';
import { STUDY_RESOURCES_DATA } from '@/lib/data/studyResourcesData';

export async function GET() {
  try {
    const resources = resourcesData.resources || Object.values(STUDY_RESOURCES_DATA);
    return NextResponse.json({
      success: true,
      count: resources.length,
      data: resources
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch study resources' },
      { status: 500 }
    );
  }
}
