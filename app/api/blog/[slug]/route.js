import { NextResponse } from 'next/server';
import { BLOG_ARTICLES } from '@/lib/data/blogData';
import blogData from '@/content/blog.json';

export async function GET(request, { params }) {
  try {
    const { slug } = params;
    const fullArticle = BLOG_ARTICLES[slug];

    if (fullArticle) {
      return NextResponse.json({ success: true, data: fullArticle });
    }

    const jsonArticle = (blogData.articles || []).find(a => a.slug === slug);

    if (jsonArticle) {
      return NextResponse.json({ success: true, data: jsonArticle });
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
