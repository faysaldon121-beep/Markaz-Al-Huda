// components/blog/blog-card.tsx
import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Language } from '@/lib/utils/language-detection';

interface BlogCardProps {
  post: any;
  language: Language;
}

export default function BlogCard({ post, language }: BlogCardProps) {
  const translation = post.translations[language];

  if (!translation) return null;

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={translation.title}
          className="w-full h-48 object-cover"
        />
      )}
      
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
          <Calendar size={14} />
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString(language, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </time>
          <span>•</span>
          <Clock size={14} />
          <span>{post.viewCount} views</span>
        </div>

        <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
          <Link 
            href={`/${language}/blog/${post.slug}`}
            className="hover:text-teal-600"
          >
            {translation.title}
          </Link>
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {translation.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 rounded-full text-xs">
              {post.category}
            </span>
          </div>

          <Link
            href={`/${language}/blog/${post.slug}`}
            className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium"
          >
            Read More
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
