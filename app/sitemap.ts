import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://yourdomain.com'; // Replace with your domain
  const routes = [
    '/',
    '/about',
    '/contact',
    '/blog',
    // add more routes as needed
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n` +
                  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap-image/1.1">\n` +
                  routes.map(route => {
                    return `  <url>\n` +
                           `    <loc>${baseUrl}${route}</loc>\n` +
                           `    <changefreq>weekly</changefreq>\n` +
                           `    <priority>0.8</priority>\n` +
                           `  </url>`;
                  }).join('\n') +
                  `</urlset>`;

  return NextResponse.json(sitemap, { status: 200 });
}