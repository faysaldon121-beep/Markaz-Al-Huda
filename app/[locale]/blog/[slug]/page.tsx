import { getBestLanguage } from '@/lib/utils/detect-language';
import { BlogService } from '@/lib/services/blog-service';
import { languages, type Language } from '@/lib/i18n/languages';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Eye, User } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const language = await getBestLanguage(locale);

  const post = await BlogService.getPostBySlug(slug, language);

  if (!post) {
    notFound();
  }

  const translation = post.translations[language];
  if (!translation) {
    notFound();
  }

  const relatedPosts = await BlogService.getRelatedPosts(slug, language);
  const langConfig = languages[language];

  return (
    <article
      className="max-w-4xl mx-auto px-4 py-12"
      dir={langConfig.dir}
    >
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href={`/${locale}/blog`}
          className="text-teal-600 hover:text-teal-700 text-sm"
        >
          ← Back to Blog
        </Link>
      </div>

      {/* Header */}
      <header className="mb-10">
        <div className="mb-4">
          <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 text-sm rounded-full">
            {post.category}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          {translation.title}
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          {translation.description}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <User size={16} />
            <span>{post.author.name}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <time dateTime={post.publishedAt?.toString()}>
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString(language, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : 'Draft'}
            </time>
          </div>
          {post.viewCount > 0 && (
            <>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Eye size={16} />
                <span>{post.viewCount} views</span>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="mb-10">
          <img
            src={post.coverImage}
            alt={translation.title}
            className="w-full h-96 object-cover rounded-xl"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
        <div dangerouslySetInnerHTML={{ __html: translation.content }} />
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-12">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/${locale}/blog?tag=${tag}`}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-16 pt-8 border-t dark:border-gray-700">
          <h2 className="text-3xl font-bold mb-8">Related Posts</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((related: any) => {
              const relTranslation = related.translations[language];
              if (!relTranslation) return null;

              return (
                <Link
                  key={related._id}
                  href={`/${locale}/blog/${related.slug}`}
                  className="block p-6 border dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                    {relTranslation.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {relTranslation.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </article>
  );
}
