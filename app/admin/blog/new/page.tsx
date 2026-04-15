// app/admin/blog/new/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import BlogEditor from '@/components/admin/blog-editor';

export default function NewBlogPage() {
  const router = useRouter();

  const handleSave = async (data: any) => {
    const res = await fetch('/api/admin/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push('/admin/blog');
    } else {
      throw new Error('Failed to create post');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 px-6">Create New Post</h1>
      <BlogEditor onSave={handleSave} />
    </div>
  );
}
