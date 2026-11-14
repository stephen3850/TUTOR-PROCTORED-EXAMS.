import { NextResponse } from 'next/server';
import { getBlogBySlug } from '@/lib/contentLoader';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request, { params }) {
  try {
    const { slug } = params;
    const article = getBlogBySlug(slug);

    if (article) {
      return NextResponse.json({ success: true, data: article });
    }

    return NextResponse.json(
      { success: false, error: 'Article not found' },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch article' },
      { status: 500 }
    );
  }
}
