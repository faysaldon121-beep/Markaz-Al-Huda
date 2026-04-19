// app/[locale]/blog/[slug]/page.tsx
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

  if (!post) notFound();

  const translation = post.translations[language];
  if (!translation) notFound();

  const relatedPosts = await BlogService.getRelatedPosts(slug, language);
  const langConfig = languages[language];

  return (
    <article
      className="max-w-4xl mx-auto px-4 py-12"
      dir={langConfig.dir}
    >
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium"
        >
          ← Back to Blog
        </Link>
      </div>

      {/* Header */}
      <header className="mb-12">
        <div className="mb-4">
          <span className="px-4 py-1.5 bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 text-sm font-medium rounded-full">
            {post.category}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 dark:text-white mb-5">
          {translation.title}
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          {translation.description}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <User size={18} />
            <span>{post.author.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <time>
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
            <div className="flex items-center gap-2">
              <Eye size={18} />
              <span>{post.viewCount} views</span>
            </div>
          )}
        </div>
      </header>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="mb-12 rounded-2xl overflow-hidden shadow-lg">
          <img
            src={post.coverImage}
            alt={translation.title}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* Markdown Content - FIXED */}
      <div className="prose prose-lg dark:prose-invert max-w-none 
                    prose-headings:text-gray-900 dark:prose-headings:text-white
                    prose-p:text-gray-700 dark:prose-p:text-gray-300
                    prose-li:text-gray-700 dark:prose-li:text-gray-300
                    prose-strong:text-teal-700 dark:prose-strong:text-teal-400
                    prose-a:text-teal-600 hover:prose-a:text-teal-700
                    prose-blockquote:border-l-teal-500">
        
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => <h1 className="text-4xl font-bold mt-10 mb-6" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-3xl font-bold mt-10 mb-5 text-gray-800 dark:text-gray-100" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-2xl font-semibold mt-8 mb-4" {...props} />,
            p: ({ node, ...props }) => <p className="mb-6 leading-relaxed" {...props} />,
            ul: ({ node, ...props }) => <ul className="mb-6 pl-6 list-disc space-y-2" {...props} />,
            ol: ({ node, ...props }) => <ol className="mb-6 pl-6 list-decimal space-y-2" {...props} />,
            li: ({ node, ...props }) => <li className="pl-2" {...props} />,
            strong: ({ node, ...props }) => <strong className="font-semibold text-teal-700 dark:text-teal-400" {...props} />,
            a: ({ node, ...props }) => <a className="underline underline-offset-2 hover:text-teal-700" target="_blank" {...props} />,
          }}
        >
          {translation.content}
        </ReactMarkdown>
      </div>

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/${locale}/blog?tag=${tag}`}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-teal-50 dark:hover:bg-teal-950 text-gray-700 dark:text-gray-300 rounded-full text-sm transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700">
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
                  className="group block p-6 border border-gray-200 dark:border-gray-700 rounded-2xl hover:border-teal-200 dark:hover:border-teal-800 hover:shadow-md transition-all duration-200"
                >
                  <h3 className="font-semibold text-lg leading-tight text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {relTranslation.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 line-clamp-3">
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
