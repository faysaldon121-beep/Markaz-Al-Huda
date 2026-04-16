// app/[locale]/blog/page.tsx
import { BlogService } from '@/lib/services/blog-service';
import { Language, getBestLanguage } from '@/lib/utils/language-detection';
import BlogCard from '@/components/blog/blog-card';

export const dynamic = 'force-dynamic';

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { page?: string; category?: string; tag?: string };
}) {
  const language = getBestLanguage(params.locale) as Language;
  const page = parseInt(searchParams.page || '1');

  const { posts, pagination } = await BlogService.getPublishedPosts(
    language,
    page,
    10,
    searchParams.category,
    searchParams.tag
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Blog</h1>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">No blog posts found.</p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any) => (
              <BlogCard key={post._id} post={post} language={language} />
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex justify-center gap-4 mt-12">
              {page > 1 && (
                <a
                  href={`?page=${page - 1}`}
                  className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                >
                  Previous
                </a>
              )}
              <span className="px-6 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                Page {page} of {pagination.pages}
              </span>
              {page < pagination.pages && (
                <a
                  href={`?page=${page + 1}`}
                  className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                >
                  Next
                </a>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
