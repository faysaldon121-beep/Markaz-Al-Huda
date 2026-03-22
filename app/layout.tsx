import type {Metadata} from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: {
    default: 'Markaz ul Huda | Quran School Kot Abdullah Qasoor',
    template: '%s | Markaz ul Huda',
  },
  description: 'Markaz ul Huda offers Hifz-e-Quran, Tajweed, Manzil, and Maariful Quran programs in Kot Abdullah, Qasoor, Pakistan. Enroll now for online and in-person Islamic education.',
  keywords: ['Quran school Pakistan', 'Hifz Quran Qasoor', 'Islamic school Kot Abdullah', 'Tajweed classes', 'Markaz ul Huda', 'online Quran courses', 'Maariful Quran', 'learn Quran Pakistan'],
  authors: [{ name: 'Markaz ul Huda' }],
  creator: 'Markaz ul Huda',
  publisher: 'Markaz ul Huda',
  metadataBase: new URL('https://markazulhuda.pk'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: 'https://markazulhuda.pk',
    siteName: 'Markaz ul Huda',
    title: 'Markaz ul Huda | Quran School Kot Abdullah Qasoor',
    description: 'Join Markaz ul Huda for Hifz, Tajweed, Manzil & Maariful Quran. Online courses & in-person classes in Qasoor, Pakistan.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Markaz ul Huda Islamic School' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Markaz ul Huda | Quran School Pakistan',
    description: 'Excellence in Islamic education. Hifz, Tajweed & Quranic studies in Kot Abdullah, Qasoor.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  verification: {
    google: 'Oxz_vV17FHU_g0ColbVp2jZ2ANwgg1udZlvwTRMrqgI',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Markaz ul Huda',
  description: 'Islamic school offering Hifz, Tajweed, Manzil, and Maariful Quran programs.',
  url: 'https://markazulhuda.pk',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kot Abdullah',
    addressRegion: 'Qasoor',
    addressCountry: 'PK',
  },
  telephone: '+92-344-1722419',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+92-344-1722419',
    contactType: 'admissions',
    availableLanguage: ['Urdu', 'English'],
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="font-sans antialiased text-stone-900 bg-stone-50">
        {children}
      </body>
    </html>
  );
}
