'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, BookOpen, Filter, X, Copy, Check } from 'lucide-react';
import type { HadithData, HadithBook } from '@/lib/hadiths-data';

type Props = {
  book: HadithBook;
  data: HadithData;
};

const PAGE_SIZE = 20;

export default function HadithBrowser({ book, data }: Props) {
  const [search, setSearch] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter hadiths
  const filtered = useMemo(() => {
    let results = data.hadiths;
    if (selectedChapter !== null) {
      results = results.filter(h => h.chapterId === selectedChapter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(h =>
        h.english.text.toLowerCase().includes(q) ||
        h.english.narrator.toLowerCase().includes(q) ||
        h.arabic.includes(q)
      );
    }
    return results;
  }, [data.hadiths, search, selectedChapter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Reset page when filters change
  useEffect(() => { setPage(1); }, [search, selectedChapter]);

  const chapterMap = useMemo(() => {
    const map = new Map<number, string>();
    data.chapters.forEach(ch => map.set(ch.id, ch.english));
    return map;
  }, [data.chapters]);

  const copyHadith = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Stats bar */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-stone-200 text-sm font-medium text-stone-600 shadow-sm">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          {data.metadata.english.title}
        </div>
        <div className="bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200 text-sm font-medium text-emerald-700 shadow-sm">
          {data.hadiths.length.toLocaleString()} total hadiths
        </div>
        <div className="bg-stone-100 px-4 py-2 rounded-full border border-stone-200 text-sm font-medium text-stone-600 shadow-sm">
          {data.chapters.length} chapters
        </div>
        {(search || selectedChapter !== null) && (
          <div className="bg-amber-50 px-4 py-2 rounded-full border border-amber-200 text-sm font-medium text-amber-700 shadow-sm">
            {filtered.length.toLocaleString()} results
          </div>
        )}
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-5 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              placeholder="Search hadiths in English or Arabic..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm bg-stone-50"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl border font-medium text-sm transition-all ${showFilters || selectedChapter !== null ? 'bg-emerald-700 text-white border-emerald-700' : 'border-stone-200 text-stone-600 hover:bg-stone-50'}`}
          >
            <Filter className="w-4 h-4" />
            {selectedChapter !== null ? 'Chapter filtered' : 'Filter by Chapter'}
          </button>
        </div>

        {/* Chapter filter dropdown */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-stone-100">
            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">Select Chapter</p>
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-2">
              <button
                onClick={() => { setSelectedChapter(null); setShowFilters(false); }}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all font-medium ${selectedChapter === null ? 'bg-emerald-700 text-white border-emerald-700' : 'border-stone-200 text-stone-600 hover:bg-stone-50'}`}
              >
                All Chapters
              </button>
              {data.chapters.map(ch => (
                <button
                  key={ch.id}
                  onClick={() => { setSelectedChapter(ch.id); setShowFilters(false); }}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all font-medium ${selectedChapter === ch.id ? 'bg-emerald-700 text-white border-emerald-700' : 'border-stone-200 text-stone-600 hover:bg-stone-50'}`}
                >
                  {ch.english}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Active filters */}
      {selectedChapter !== null && (
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm text-stone-500">Filtered by:</span>
          <span className="flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1.5 rounded-full">
            {chapterMap.get(selectedChapter)}
            <button onClick={() => setSelectedChapter(null)} className="hover:text-emerald-900">
              <X className="w-3.5 h-3.5" />
            </button>
          </span>
        </div>
      )}

      {/* Hadiths list */}
      {paginated.length === 0 ? (
        <div className="text-center py-20 text-stone-400">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="font-medium text-lg">No hadiths found</p>
          <p className="text-sm">Try a different search term or chapter.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {paginated.map((hadith) => (
            <article key={hadith.id} className="bg-white rounded-3xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              {/* Hadith header */}
              <div className="flex items-center justify-between px-6 py-4 bg-stone-50 border-b border-stone-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {hadith.idInBook}
                  </span>
                  <div>
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                      {book.name} · #{hadith.idInBook}
                    </span>
                    {chapterMap.get(hadith.chapterId) && (
                      <p className="text-xs text-stone-400 mt-0.5">{chapterMap.get(hadith.chapterId)}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => copyHadith(hadith.id, `${hadith.english.narrator}\n${hadith.english.text}\n\n— ${book.name} #${hadith.idInBook}`)}
                  className="p-2 rounded-xl hover:bg-stone-100 transition-colors text-stone-400 hover:text-stone-700"
                  title="Copy hadith"
                >
                  {copiedId === hadith.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="p-6 space-y-5">
                {/* Arabic text */}
                <div className="bg-emerald-50/60 rounded-2xl p-5 border border-emerald-100">
                  <p className="text-right text-stone-800 leading-[2.2] text-lg font-arabic" dir="rtl" lang="ar">
                    {hadith.arabic}
                  </p>
                </div>

                {/* English translation */}
                <div>
                  {hadith.english.narrator && (
                    <p className="text-emerald-700 font-bold text-sm mb-2">{hadith.english.narrator}</p>
                  )}
                  <p className="text-stone-700 leading-relaxed text-sm">{hadith.english.text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-10 pt-8 border-t border-stone-200">
          <button
            onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            disabled={page === 1}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-stone-200 font-medium text-sm text-stone-600 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-stone-500">
              Page <strong>{page}</strong> of <strong>{totalPages}</strong>
            </span>
            <span className="text-xs text-stone-400">
              ({filtered.length.toLocaleString()} hadiths)
            </span>
          </div>

          <button
            onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            disabled={page === totalPages}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-stone-200 font-medium text-sm text-stone-600 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
