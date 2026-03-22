import { MetadataRoute } from 'next';
import { COURSES_DATA } from '@/lib/courses-data';
import { HADITHS_DATA } from '@/lib/hadiths-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://markazulhuda.vercel.app/';
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/admissions`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hadiths`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // Dynamic course pages
  const coursePages: MetadataRoute.Sitemap = (COURSES_DATA || []).map((course: any) => ({
    url: `${baseUrl}/courses/${course.slug || course.id}`,
    lastModified: course.updatedAt ? new Date(course.updatedAt) : now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Dynamic hadith pages (limited to 50)
  const hadithPages: MetadataRoute.Sitemap = (HADITHS_DATA || [])
    .slice(0, 50)
    .map((hadith: any) => ({
      url: `${baseUrl}/hadiths/${hadith.id}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  return [...staticPages, ...coursePages, ...hadithPages];
}
