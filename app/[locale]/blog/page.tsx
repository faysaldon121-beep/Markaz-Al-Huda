// app/[locale]/blog/page.tsx
import { BlogService } from '@/lib/services/blog-service';
import { Language, getBestLanguage } from '@/lib/utils/language-detection';
import BlogCard from '@/components/blog/blog-card';

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { page?: string; category?: string; tag?: string };
}) {
  const language = await getBestLanguage(params.locale);
  const page = parseInt(searchParams.page || '1');

  const { posts, pagination } = await BlogService.getPublishedPosts(
    language as Language,
    page,
    10,
    searchParams.category,
    searchParams.tag
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: any) => (
          <BlogCard key={post._id} post={post} language={language as Language} />
        ))}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center gap-4 mt-12">
          {page > 1 && (
            <a
              href={`?page=${page - 1}`}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg"
            >
              Previous
            </a>
          )}
          {page < pagination.pages && (
            <a
              href={`?page=${page + 1}`}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg"
            >
              Next
            </a>
          )}
        </div>
      )}
    </div>
  );
}
