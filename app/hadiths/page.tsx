import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ChevronRight, Search } from 'lucide-react';
import Logo from '@/components/Logo';
import { hadithBooks } from '@/lib/hadiths-data';

export const metadata: Metadata = {
  title: 'Hadith Collections — The 9 Books',
  description: 'Browse authentic hadith collections from the 9 major books including Sahih Bukhari, Sahih Muslim, and more at Markaz ul Huda.',
};

export default function HadithsPage() {
  const totalHadiths = hadithBooks.reduce((sum, b) => sum + b.count, 0);

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <Logo className="w-12 h-12" />
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold tracking-tight text-slate-800 leading-none">Markaz ul Huda</span>
                <span className="text-[8px] font-medium tracking-[0.1em] text-green-600 uppercase mt-1">we muslimate</span>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/courses" className="text-sm font-medium text-stone-600 hover:text-emerald-700 transition-colors">Courses</Link>
              <Link href="/login" className="text-sm font-medium text-stone-600 hover:text-emerald-700 transition-colors">Login</Link>
              <Link href="/signup" className="bg-green-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-green-700 transition-all shadow-md">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-emerald-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-400 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block px-4 py-1 bg-emerald-800 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-emerald-700">
            Prophetic Traditions
          </span>
          <div className="text-5xl mb-4">📖</div>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold mb-6">Hadith Collections</h1>
          <p className="text-emerald-100/80 text-lg max-w-2xl mx-auto mb-8">
            Browse authentic hadith from the nine major books of the Prophet's ﷺ traditions.
            Each hadith includes Arabic text, narrator, and English translation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm mt-10">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">{totalHadiths.toLocaleString()}</p>
              <p className="text-emerald-300 text-xs uppercase tracking-widest mt-1">Total Hadiths</p>
            </div>
            <div className="w-px h-10 bg-emerald-700" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white">9</p>
              <p className="text-emerald-300 text-xs uppercase tracking-widest mt-1">Major Books</p>
            </div>
            <div className="w-px h-10 bg-emerald-700" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white">2</p>
              <p className="text-emerald-300 text-xs uppercase tracking-widest mt-1">Languages</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search hint bar */}
      <div className="bg-white border-b border-stone-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 bg-stone-50 border border-stone-200 rounded-2xl px-5 py-3 max-w-xl mx-auto">
            <Search className="w-5 h-5 text-stone-400 flex-shrink-0" />
            <p className="text-stone-500 text-sm">Select a book below to browse and search its hadiths...</p>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-stone-900 mb-10 text-center">
            The Nine Books
            <span className="block text-sm font-sans font-normal text-stone-400 mt-2 tracking-widest uppercase">الكتب التسعة</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hadithBooks.map((book) => (
              <Link
                key={book.id}
                href={`/hadiths/${book.slug}`}
                className="group bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/8 transition-all duration-300"
              >
                <div className={`bg-gradient-to-br ${book.color} p-6 text-white`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-white/60 text-xs font-mono">{book.count.toLocaleString()} hadiths</span>
                  </div>
                  <p className="text-2xl font-bold mb-1 leading-tight" dir="rtl">{book.arabicName}</p>
                  <p className="text-white/70 text-xs" dir="rtl">{book.arabicAuthor}</p>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-stone-900 mb-1 group-hover:text-emerald-700 transition-colors">
                    {book.name}
                  </h3>
                  <p className="text-stone-400 text-xs mb-3 font-medium">{book.author}</p>
                  <p className="text-stone-500 text-sm leading-relaxed mb-4">{book.description}</p>
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm group-hover:gap-3 transition-all">
                    Browse Hadiths <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Attribution */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="bg-stone-100 rounded-2xl p-6 text-center">
          <p className="text-stone-500 text-sm">
            Hadith data sourced from{' '}
            <a
              href="https://github.com/AhmedBaset/hadith-json"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 font-medium hover:underline"
            >
              hadith-json by AhmedBaset
            </a>
            . Always verify with a qualified Islamic scholar.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-stone-400 text-sm">© 2026 Markaz ul Huda. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4 text-sm text-stone-500">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
            <Link href="/admissions" className="hover:text-white transition-colors">Admissions</Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
