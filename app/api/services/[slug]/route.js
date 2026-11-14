import { NextResponse } from 'next/server';
import { getServiceBySlug } from '@/lib/contentLoader';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request, { params }) {
  try {
    const { slug } = params;
    const service = getServiceBySlug(slug);

    if (service) {
      return NextResponse.json({ success: true, data: service });
    }

    return NextResponse.json(
      { success: false, error: 'Service not found' },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch service' },
      { status: 500 }
    );
  }
}
