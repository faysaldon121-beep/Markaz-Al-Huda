import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, BookOpen } from 'lucide-react';
import Logo from '@/components/Logo';
import { hadithBooks, getBookBySlug, fetchHadithData } from '@/lib/hadiths-data';
import HadithBrowser from '@/components/HadithBrowser';

export async function generateStaticParams() {
  return hadithBooks.map(b => ({ book: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ book: string }> }): Promise<Metadata> {
  const { book: slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) return { title: 'Book Not Found' };
  return {
    title: `${book.name} — Hadith Collection`,
    description: `Browse ${book.count.toLocaleString()} hadiths from ${book.name} by ${book.author}. Arabic text with English translation.`,
  };
}

export default async function HadithBookPage({ params }: { params: Promise<{ book: string }> }) {
  const { book: slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) notFound();

  let data;
  try {
    data = await fetchHadithData(slug);
  } catch {
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-stone-500 text-lg">Failed to load hadith data. Please try again later.</p>
          <Link href="/hadiths" className="mt-4 inline-block text-emerald-700 font-bold hover:underline">
            ← Back to Hadith Collections
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link href="/hadiths" className="flex items-center gap-2 text-emerald-700 font-medium hover:gap-3 transition-all text-sm">
              <ChevronLeft className="w-5 h-5" /> All Books
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <Logo className="w-10 h-10" />
              <span className="font-serif text-lg font-bold text-slate-800">Markaz ul Huda</span>
            </Link>
            <Link href="/signup" className="bg-green-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-green-700 transition-all">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Book hero */}
      <section className={`bg-gradient-to-br ${book.color} text-white py-14`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/60 text-xs font-bold uppercase tracking-widest">Hadith Collection</span>
              </div>
              <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-2">{book.name}</h1>
              <p className="text-3xl font-bold text-white/80 mb-3" dir="rtl">{book.arabicName}</p>
              <p className="text-white/70 text-sm">{book.author}</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/15 backdrop-blur rounded-2xl px-6 py-4 text-center">
                <p className="text-2xl font-bold">{data.hadiths.length.toLocaleString()}</p>
                <p className="text-white/60 text-xs uppercase tracking-widest mt-1">Hadiths</p>
              </div>
              <div className="bg-white/15 backdrop-blur rounded-2xl px-6 py-4 text-center">
                <p className="text-2xl font-bold">{data.chapters.length}</p>
                <p className="text-white/60 text-xs uppercase tracking-widest mt-1">Chapters</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browser */}
      <HadithBrowser book={book} data={data} />

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-10 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-stone-400 text-sm">© 2026 Markaz ul Huda. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4 text-sm text-stone-500">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
            <Link href="/hadiths" className="hover:text-white transition-colors">All Books</Link>
            <Link href="/admissions" className="hover:text-white transition-colors">Admissions</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
