// app/api/blog/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { BlogService } from '@/lib/services/blog-service';
import { Language } from '@/lib/utils/language-detection';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const language = (searchParams.get('lang') || 'en') as Language;

    const post = await BlogService.getPostBySlug(params.slug, language);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Increment view count asynchronously
    BlogService.incrementViews(params.slug).catch(console.error);

    return NextResponse.json(post);
  } catch (error) {
    console.error('Get post error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}
