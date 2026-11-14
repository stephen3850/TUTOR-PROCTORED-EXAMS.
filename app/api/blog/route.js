import { NextResponse } from 'next/server';
import { getBlogsContent } from '@/lib/contentLoader';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let articles = getBlogsContent();

    if (category) {
      articles = articles.filter((a) => a.category?.toLowerCase() === category.toLowerCase());
    }

    return NextResponse.json({
      success: true,
      count: articles.length,
      data: articles,
    });
  } catch (error) {
    console.error('[API Blog Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog articles' },
      { status: 500 }
    );
  }
}
