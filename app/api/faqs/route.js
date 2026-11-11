import { NextResponse } from 'next/server';
import faqsData from '@/content/faqs.json';
import { MASTER_FAQS } from '@/lib/data/faqsData';

export async function GET() {
  try {
    const data = faqsData.categories || MASTER_FAQS;
    return NextResponse.json({
      success: true,
      data
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch FAQs' },
      { status: 500 }
    );
  }
}
