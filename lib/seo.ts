// lib/seo.ts
import { NextSeo } from 'next-seo';
import { getServerSideSitemap, Sitemap } from 'next-sitemap';

const SEO = {
  title: 'Markaz Al Huda',
  description: 'An Islamic school Dedicated to excellence in Islamic education. We provide a spiritual environment for Hifz, Tajweed, and deep Quranic understanding in Kot Abdullah Qasoor.',
  openGraph: {
    title: 'Markaz Al Huda',
    description: 'Dedicated to excellence in Islamic education. We provide a spiritual environment for Hifz, Tajweed, and deep Quranic understanding in Kot Abdullah Qasoor.',
    url: 'https://markazalhuda.vercel.app',
    type: 'website',
    images: [
      { url: 'https://markazalhuda.com/image.jpg', alt: 'Image Alt' },
    ],
    site_name: 'Markaz Al Huda',
  },
  twitter: {
    handle: '@yourhandle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};

export const generateMetaTags = (title: string, description: string) => {
  return {
    title: title || SEO.title,
    description: description || SEO.description,
  };
};

export const SitemapUtil = (res) => {
  const fields = [
    { loc: 'https://markazalhuda.com' },
    // Add more routes as necessary
  ];
  res.setHeader('Content-Type', 'text/xml');
  return getServerSideSitemap(res, fields);
};

export const generateRobotsTxt = () => {
  return `User-agent: *\nDisallow: /api/\nSitemap: https://markazalhuda.com/sitemap.xml`;
};

export const generateStructuredData = () => {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Markaz Al Huda',
    url: 'https://markazalhuda.com',
    logo: 'https://markazalhuda.com/logo.png',
  });
};

export default SEO;
