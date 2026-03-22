import { SEO_CONFIG } from './seo-config'

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: SEO_CONFIG.siteName,
    description: SEO_CONFIG.description,
    url: SEO_CONFIG.baseUrl,
    telephone: SEO_CONFIG.phone,
    email: SEO_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SEO_CONFIG.address,
      addressCountry: 'PK',
    },
    sameAs: [
      SEO_CONFIG.socialMedia.facebook,
      SEO_CONFIG.socialMedia.twitter,
      SEO_CONFIG.socialMedia.instagram,
    ].filter(Boolean),
    image: SEO_CONFIG.ogImage,
  }
}

export function generateCourseSchema(course: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    provider: {
      '@type': 'EducationalOrganization',
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.baseUrl,
    },
    instructor: {
      '@type': 'Person',
      name: course.instructor || 'Qari',
    },
    image: course.thumbnail,
    url: `${SEO_CONFIG.baseUrl}/courses/${course.slug}`,
  }
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
  }
}