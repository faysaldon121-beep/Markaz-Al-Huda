import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import Logo from '@/components/Logo';
import { getBookBySlug, fetchHadithData } from '@/lib/hadiths-data';

type Props = {
  params: Promise<{ book: string; hadith: string }>;
};

// Pages are generated on demand and cached for 24 hours (ISR)
// No need to pre-build all 39,500 pages at build time
export const revalidate = 86400;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { book: slug, hadith: hadithNum } = await params;
  const book = getBookBySlug(slug);
  if (!book) return { title: 'Book Not Found' };

  const hadithNumber = parseInt(hadithNum);
  if (isNaN(hadithNumber)) return { title: 'Hadith Not Found' };

  let data;
  try {
    data = await fetchHadithData(slug);
  } catch {
    return { title: `${book.name} — Hadith ${hadithNumber}` };
  }

  const hadith = data.hadiths.find(h => h.idInBook === hadithNumber);
  if (!hadith) return { title: 'Hadith Not Found' };

  const description = `${hadith.english.narrator ? hadith.english.narrator + ': ' : ''}${hadith.english.text}`.slice(0, 160);

  return {
    title: `${book.name} — Hadith ${hadithNumber}`,
    description,
    openGraph: {
      title: `${book.name} — Hadith ${hadithNumber}`,
      description,
      url: `https://markazalhuda.vercel.app/hadiths/${slug}/${hadithNumber}`,
      siteName: 'Markaz ul Huda',
    },
    twitter: {
      card: 'summary',
      title: `${book.name} — Hadith ${hadithNumber}`,
      description,
    },
  };
}

export default async function SingleHadithPage({ params }: Props) {
  const { book: slug, hadith: hadithNum } = await params;

  const book = getBookBySlug(slug);
  if (!book) notFound();

  const hadithNumber = parseInt(hadithNum);
  if (isNaN(hadithNumber) || hadithNumber < 1) notFound();

  let data;
  try {
    data = await fetchHadithData(slug);
  } catch {
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-stone-500 text-lg">Failed to load hadith data. Please try again later.</p>
          <Link href={`/hadiths/${slug}`} className="mt-4 inline-block text-emerald-700 font-bold hover:underline">
            ← Back to {book.name}
          </Link>
        </div>
      </main>
    );
  }

  const hadith = data.hadiths.find(h => h.idInBook === hadithNumber);
  if (!hadith) notFound();

  const chapter = data.chapters.find(c => c.id === hadith.chapterId);

  const prevNum = hadithNumber > 1 ? hadithNumber - 1 : null;
  const nextNum = hadithNumber < book.count ? hadithNumber + 1 : null;

  return (
    <main className="min-h-screen bg-stone-50">

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link
              href={`/hadiths/${slug}`}
              className="flex items-center gap-2 text-emerald-700 font-medium hover:gap-3 transition-all text-sm"
            >
              <ChevronLeft className="w-5 h-5" /> {book.name}
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <Logo className="w-10 h-10" />
              <span className="font-serif text-lg font-bold text-slate-800">Markaz ul Huda</span>
            </Link>
            <Link
              href="/signup"
              className="bg-green-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-green-700 transition-all"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Book Header Strip */}
      <div className={`bg-gradient-to-br ${book.color} text-white py-6`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center gap-2">
          <BookOpen className="w-4 h-4 text-white/70" />
          <span className="text-white/70 text-sm">{book.name}</span>
          <span className="text-white/40">•</span>
          <span className="text-white font-bold text-sm">Hadith {hadithNumber}</span>
          {chapter && (
            <>
              <span className="text-white/40">•</span>
              <span className="text-white/70 text-sm">{chapter.english}</span>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Chapter Info */}
        {chapter && (
          <div className="mb-8 p-5 bg-white rounded-2xl border border-stone-200">
            <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">Chapter</p>
            <p className="text-stone-800 font-semibold">{chapter.english}</p>
            <p className="text-stone-500 text-base mt-2 leading-relaxed" dir="rtl">{chapter.arabic}</p>
          </div>
        )}

        {/* Arabic Text */}
        <div className="bg-white rounded-2xl border border-stone-200 p-8 mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-5">Arabic Text</p>
          <p className="text-2xl leading-loose text-stone-800 text-right font-arabic" dir="rtl">
            {hadith.arabic}
          </p>
        </div>

        {/* English Translation */}
        <div className="bg-white rounded-2xl border border-stone-200 p-8 mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-5">English Translation</p>
          {hadith.english.narrator && (
            <p className="text-emerald-700 font-semibold text-sm mb-3">{hadith.english.narrator}</p>
          )}
          <p className="text-stone-700 leading-relaxed text-lg">{hadith.english.text}</p>
        </div>

        {/* Hadith Meta Info */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center divide-x divide-stone-100">
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-400 mb-1">Book</p>
              <p className="font-bold text-stone-800 text-sm">{book.name}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-400 mb-1">Hadith No.</p>
              <p className="font-bold text-stone-800 text-sm">{hadithNumber}</p>
            </div>
            <div className="col-span-2 sm:col-span-1 border-t sm:border-t-0 border-stone-100 pt-4 sm:pt-0">
              <p className="text-xs uppercase tracking-widest text-stone-400 mb-1">Author</p>
              <p className="font-bold text-stone-800 text-sm">{book.author}</p>
            </div>
          </div>
        </div>

        {/* Prev / Next Navigation */}
        <div className="flex justify-between items-center gap-4">
          {prevNum ? (
            <Link
              href={`/hadiths/${slug}/${prevNum}`}
              className="flex items-center gap-2 bg-white border border-stone-200 text-stone-700 px-5 py-3 rounded-full hover:bg-stone-50 transition-all text-sm font-semibold"
            >
              <ChevronLeft className="w-4 h-4" /> Hadith {prevNum}
            </Link>
          ) : <div />}

          <Link
            href={`/hadiths/${slug}`}
            className="text-emerald-700 text-sm font-medium hover:underline"
          >
            All Hadiths
          </Link>

          {nextNum ? (
            <Link
              href={`/hadiths/${slug}/${nextNum}`}
              className="flex items-center gap-2 bg-white border border-stone-200 text-stone-700 px-5 py-3 rounded-full hover:bg-stone-50 transition-all text-sm font-semibold"
            >
              Hadith {nextNum} <ChevronRight className="w-4 h-4" />
            </Link>
          ) : <div />}
        </div>
      </section>

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
