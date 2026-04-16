import { NextRequest, NextResponse } from 'next/server';
import { BlogService } from '@/lib/services/blog-service';
import type { Language } from '@/lib/i18n/languages';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const searchParams = request.nextUrl.searchParams;
    const language = (searchParams.get('lang') || 'en') as Language;

    const post = await BlogService.getPostBySlug(slug, language);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Increment view count asynchronously
    BlogService.incrementViews(slug).catch(console.error);

    return NextResponse.json(post);
  } catch (error) {
    console.error('Get post error:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}
