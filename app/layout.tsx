import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-serif', });

export const metadata: Metadata = {
  title: 'Markaz Al Huda | Islamic School',
  description: 'Excellence in Hifz, Tajweed, Manzil, and Maariful Quran at Kot Abdullah Qasoor.',
  verification: {
    google: 'Oxz_vV17FHU_g0ColbVp2jZ2ANwgg1udZlvwTRMrqgI',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}> 
      <body suppressHydrationWarning className="font-sans antialiased text-stone-900 bg-stone-50">
        {children}
      </body> 
    </html>
  );
}