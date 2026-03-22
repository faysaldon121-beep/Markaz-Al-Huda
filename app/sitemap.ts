import { MetadataRoute } from 'next';

// Your hadith books data (embedded directly)
const hadithBooks = [
  { slug: 'bukhari', count: 7277 },
  { slug: 'muslim', count: 5362 },
  { slug: 'abudawud', count: 4590 },
  { slug: 'tirmidhi', count: 3891 },
  { slug: 'nasai', count: 5662 },
  { slug: 'ibnmajah', count: 4332 },
  { slug: 'malik', count: 1594 },
  { slug: 'ahmed', count: 3450 },
  { slug: 'darimi', count: 3367 },
];

// Base URL (ensures no typos in sitemap before verification)
const BASE_URL = 'https://markazalhuda.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // 1. Static Pages
  const staticPages = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/admissions`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${BASE_URL}/courses`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/hadiths`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
  ];

  // 2. Hadith Book Pages (9 Index Pages)
  const bookPages = hadithBooks.map(book => (
    { url: `${BASE_URL}/hadiths/${book.slug}`, lastModified: now, priority: 0.7 }
  ));

  // 3. All Hadith Pages (~39,525)
  const hadithPages = hadithBooks.flatMap(book =>
    Array.from({ length: book.count }, (_, index) => ({
      url: `${BASE_URL}/hadiths/${book.slug}/${index + 1}`,
      lastModified: now,
      changeFrequency: 'yearly', // Best practice for rarely changed hadiths
      priority: 0.5,             // Lower priority for deep linked pages
    }))
  );

  // Combine all routes
  return [...staticPages, ...bookPages, ...hadithPages] as MetadataRoute.Sitemap;
}
