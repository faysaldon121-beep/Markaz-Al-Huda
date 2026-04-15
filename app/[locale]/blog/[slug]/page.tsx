// app/[locale]/blog/[slug]/page.tsx
import { BlogService } from '@/lib/services/blog-service';
import { Language, getBestLanguage, languages } from '@/lib/utils/language-detection';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';

export default async function BlogPostPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const language = await getBestLanguage(params.locale);
  const post = await BlogService.getPostBySlug(params.slug, language as Language);

  if (!post) {
    notFound();
  }

  const translation = post.translations[language as Language];
  const relatedPosts = await BlogService.getRelatedPosts(params.slug, language as Language);

  return (
    <article className="max-w-4xl mx-auto px-4 py-12" dir={languages[language as Language].dir}>
      <h1 className="text-5xl font-bold mb-4">{translation?.title}</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        {translation?.description}
      </p>

      <div className="flex gap-4 mb-8 text-sm text-gray-600 dark:text-gray-400">
        <span>{post.author.name}</span>
        <span>•</span>
        <span>{new Date(post.publishedAt!).toLocaleDateString()}</span>
        <span>•</span>
        <span>{post.viewCount} views</span>
      </div>

      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={translation?.title}
          className="w-full h-96 object-cover rounded-lg mb-8"
        />
      )}

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {translation?.content || ''}
        </ReactMarkdown>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6">Related Posts</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((related: any) => (
              <a
                key={related._id}
                href={`/${params.locale}/blog/${related.slug}`}
                className="block p-4 border rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="font-bold mb-2">
                  {related.translations[language as Language]?.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {related.translations[language as Language]?.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
