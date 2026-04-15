// app/admin/blog/edit/[slug]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogEditor from '@/components/admin/blog-editor';

export default function EditBlogPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/admin/blog/${params.slug}`);
      const data = await res.json();
      setPost(data);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data: any) => {
    const res = await fetch(`/api/admin/blog/${params.slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push('/admin/blog');
    } else {
      throw new Error('Failed to update post');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 px-6">Edit Post</h1>
      <BlogEditor initialData={post} onSave={handleSave} />
    </div>
  );
}
