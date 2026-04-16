import { getBestLanguage } from '@/lib/utils/detect-language';
import { BlogService } from '@/lib/services/blog-service';
import BlogCard from '@/components/blog/blog-card';
import type { Language } from '@/lib/i18n/languages';

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; category?: string; tag?: string }>;
}

export default async function BlogPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const { page: pageParam, category, tag } = await searchParams;

  const language = await getBestLanguage(locale);
  const page = parseInt(pageParam || '1');

  const { posts, pagination } = await BlogService.getPublishedPosts(
    language,
    page,
    9,
    category,
    tag
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10 text-center">Blog</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: any) => (
          <BlogCard key={post._id} post={post} language={language} />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-center text-gray-500 py-20">No posts found.</p>
      )}

      {pagination?.pages > 1 && (
        <div className="flex justify-center gap-4 mt-12">
          {page > 1 && (
            <a
              href={`?page=${page - 1}`}
              className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              ← Previous
            </a>
          )}
          {page < pagination.pages && (
            <a
              href={`?page=${page + 1}`}
              className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              Next →
            </a>
          )}
        </div>
      )}
    </div>
  );
}
