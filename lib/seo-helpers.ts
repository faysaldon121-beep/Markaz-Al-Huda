import { Metadata } from 'next';

export function generatePageMetadata(
  title: string,
  description: string,
  url: string,
  options?: {
    keywords?: string[];
    image?: string;
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
    type?: 'article' | 'website' | 'product';
  }
): Metadata {
  const baseUrl = 'https://markazulhuda.pk';
  const fullUrl = `${baseUrl}${url}`;

  return {
    title,
    description,
    keywords: options?.keywords,
    authors: options?.author ? [{ name: options.author }] : undefined,
    canonical: fullUrl,
    openGraph: {
      title,
      description,
      url: fullUrl,
      type: (options?.type || 'website') as 'article' | 'website' | 'product',
      images: [{ url: options?.image || '/og-image.jpg', width: 1200, height: 630 }],
      siteName: 'Markaz ul Huda',
      locale: 'en_PK',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [options?.image || '/og-image.jpg'],
      site: '@markazulhuda',
    },
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function createCanonicalUrl(path: string): string {
  return `https://markazulhuda.pk${path}`;
}
