import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { BlogService } from '@/lib/services/blog-service';

// GET - Get all posts (admin)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || !['admin', 'editor', 'author'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const result = await BlogService.getAllPostsAdmin(page, limit);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Get posts error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST - Create new post
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || !['admin', 'editor', 'author'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const post = await BlogService.createPost({
      ...data,
      authorId: session.user.id,
      authorName: session.user.name || 'Anonymous',
      authorEmail: session.user.email || '',
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
