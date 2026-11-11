import { NextResponse } from 'next/server';
import blogData from '@/content/blog.json';
import { BLOG_ARTICLES } from '@/lib/data/blogData';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let articles = blogData.articles || Object.values(BLOG_ARTICLES);

    if (category) {
      articles = articles.filter(a => a.category?.toLowerCase() === category.toLowerCase());
    }

    return NextResponse.json({
      success: true,
      count: articles.length,
      data: articles
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog articles' },
      { status: 500 }
    );
  }
}
