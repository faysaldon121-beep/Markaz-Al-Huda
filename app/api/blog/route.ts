// app/api/blog/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { BlogService } from '@/lib/services/blog-service';
import { Language } from '@/lib/utils/language-detection';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const language = (searchParams.get('lang') || 'en') as Language;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category') || undefined;
    const tag = searchParams.get('tag') || undefined;

    const result = await BlogService.getPublishedPosts(
      language,
      page,
      limit,
      category,
      tag
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Get posts error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
