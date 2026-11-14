import { NextResponse } from 'next/server';
import { MASTER_FAQS } from '@/lib/data/faqsData';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    let categories = MASTER_FAQS;
    try {
      const filePath = path.join(process.cwd(), 'content', 'faqs.json');
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf8');
        const json = JSON.parse(raw);
        if (json?.categories) {
          categories = json.categories;
        }
      }
    } catch (readErr) {
      console.error('[API FAQs Read Error]:', readErr);
    }

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch FAQs' },
      { status: 500 }
    );
  }
}
