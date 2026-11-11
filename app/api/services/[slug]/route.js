import { NextResponse } from 'next/server';
import { SERVICES_DATA } from '@/lib/data/servicesData';
import servicesData from '@/content/services.json';

export async function GET(request, { params }) {
  try {
    const { slug } = params;
    const fullService = SERVICES_DATA[slug];

    if (fullService) {
      return NextResponse.json({ success: true, data: fullService });
    }

    const jsonService = (servicesData.services || []).find(s => s.slug === slug);

    if (jsonService) {
      return NextResponse.json({ success: true, data: jsonService });
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
