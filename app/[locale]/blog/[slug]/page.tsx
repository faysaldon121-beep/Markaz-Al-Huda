import { getBestLanguage } from '@/lib/utils/detect-language';
import { BlogService } from '@/lib/services/blog-service';
import { languages, type Language } from '@/lib/i18n/languages';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Eye, User, ArrowLeft } from 'lucide-react';

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
      className="min-h-screen bg-white dark:bg-gray-900"
      dir={langConfig.dir}
    >
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 text-sm font-medium transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </div>

        {/* Header */}
        <header className="mb-10">
          <div className="mb-4">
            <span className="inline-block px-4 py-1.5 bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 text-sm font-medium rounded-full">
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
            {translation.title}
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            {translation.description}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 pb-8 border-b dark:border-gray-700">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{post.author.name}</span>
            </div>
            <span className="text-gray-300 dark:text-gray-600">•</span>
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
                <span className="text-gray-300 dark:text-gray-600">•</span>
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
          <div className="mb-12">
            <img
              src={post.coverImage}
              alt={translation.title}
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
          </div>
        )}

        {/* Content - FIXED MARKDOWN RENDERING */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-12
          prose-headings:text-gray-900 dark:prose-headings:text-white
          prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-6 prose-h1:mt-8
          prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-8
          prose-h3:text-2xl prose-h3:font-semibold prose-h3:mb-3 prose-h3:mt-6
          prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
          prose-a:text-teal-600 dark:prose-a:text-teal-400 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
          prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
          prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4
          prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:mb-2
          prose-blockquote:border-l-4 prose-blockquote:border-teal-500 prose-blockquote:pl-4 prose-blockquote:italic
          prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:p-4 prose-pre:rounded-lg
        ">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {translation.content}
          </ReactMarkdown>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-16 pb-8 border-b dark:border-gray-700">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/${locale}/blog?tag=${tag}`}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-teal-100 dark:hover:bg-teal-900/50 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
              Related Posts
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((related: any) => {
                const relTranslation = related.translations[language];
                if (!relTranslation) return null;

                return (
                  <Link
                    key={related._id}
                    href={`/${locale}/blog/${related.slug}`}
                    className="group block p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-xl hover:border-teal-500 dark:hover:border-teal-500 transition-all duration-300"
                  >
                    {related.coverImage && (
                      <img
                        src={related.coverImage}
                        alt={relTranslation.title}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
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
      </div>
    </article>
  );
}
