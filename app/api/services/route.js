import { NextResponse } from 'next/server';
import servicesData from '@/content/services.json';
import { SERVICES_DATA } from '@/lib/data/servicesData';

export async function GET() {
  try {
    const services = servicesData.services || Object.values(SERVICES_DATA);
    return NextResponse.json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}
