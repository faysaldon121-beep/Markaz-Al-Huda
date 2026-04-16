// components/admin/blog-editor.tsx
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { languages, type Language } from '@/lib/i18n/languages'; // ✅ Changed
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { 
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 rounded animate-pulse"></div>
});

interface BlogEditorProps {
  initialData?: any;
  onSave: (data: any) => Promise<void>;
}

export default function BlogEditor({ initialData, onSave }: BlogEditorProps) {
  const [activeLanguage, setActiveLanguage] = useState<Language>('en');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [category, setCategory] = useState(initialData?.category || 'Islamic Studies');
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [status, setStatus] = useState(initialData?.status || 'draft');
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || '');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [translations, setTranslations] = useState<any>(
    initialData?.translations || {
      en: { title: '', description: '', content: '' },
      es: { title: '', description: '', content: '' },
      de: { title: '', description: '', content: '' },
      ur: { title: '', description: '', content: '' },
      hi: { title: '', description: '', content: '' },
      ru: { title: '', description: '', content: '' },
    }
  );

  // Ensure component is mounted before rendering Quill
  useState(() => {
    setMounted(true);
  });

  const handleTranslationChange = (
    field: 'title' | 'description' | 'content',
    value: string
  ) => {
    setTranslations({
      ...translations,
      [activeLanguage]: {
        ...translations[activeLanguage],
        [field]: value,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSave({
        slug,
        translations,
        category,
        tags,
        status,
        featured,
        coverImage,
      });
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      [{ color: [] }, { background: [] }],
      ['blockquote', 'code-block'],
      ['clean'],
    ],
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Language Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {Object.entries(languages).map(([code, lang]) => (
          <button
            key={code}
            type="button"
            onClick={() => setActiveLanguage(code as Language)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              activeLanguage === code
                ? 'bg-teal-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {lang.flag} {lang.name}
          </button>
        ))}
      </div>

      {/* Basic Info */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Slug (URL)</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            >
              <option>Islamic Studies</option>
              <option>Quran</option>
              <option>Hadith</option>
              <option>Fiqh</option>
              <option>History</option>
              <option>Education</option>
              <option>Community</option>
              <option>News</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
          <input
            type="text"
            value={tags.join(', ')}
            onChange={(e) => setTags(e.target.value.split(',').map(t => t.trim()))}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            placeholder="education, islam, quran"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Cover Image URL</label>
          <input
            type="url"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="featured"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="featured" className="text-sm font-medium">
            Featured Post
          </label>
        </div>
      </div>

      {/* Content Editor */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Title ({languages[activeLanguage].name})
          </label>
          <input
            type="text"
            value={translations[activeLanguage]?.title || ''}
            onChange={(e) => handleTranslationChange('title', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            dir={languages[activeLanguage].dir}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Description ({languages[activeLanguage].name})
          </label>
          <textarea
            value={translations[activeLanguage]?.description || ''}
            onChange={(e) => handleTranslationChange('description', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            rows={3}
            dir={languages[activeLanguage].dir}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Content ({languages[activeLanguage].name})
          </label>
          <div className="bg-white" dir={languages[activeLanguage].dir}>
            {mounted && (
              <ReactQuill
                theme="snow"
                value={translations[activeLanguage]?.content || ''}
                onChange={(value) => handleTranslationChange('content', value)}
                modules={modules}
                className="min-h-[400px]"
              />
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Post'}
        </button>
      </div>
    </form>
  );
}
