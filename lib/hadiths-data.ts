export type HadithBook = {
  id: string;
  slug: string;
  name: string;
  arabicName: string;
  author: string;
  arabicAuthor: string;
  count: number;
  description: string;
  color: string;
  iconBg: string;
};

export const hadithBooks: HadithBook[] = [
  {
    id: 'bukhari',
    slug: 'bukhari',
    name: 'Sahih al-Bukhari',
    arabicName: 'صحيح البخاري',
    author: 'Imam Muhammad ibn Ismail al-Bukhari',
    arabicAuthor: 'الإمام محمد بن إسماعيل البخاري',
    count: 7277,
    description: 'Considered the most authentic book after the Quran. Imam Bukhari spent 16 years compiling this collection.',
    color: 'from-amber-600 to-amber-800',
    iconBg: 'bg-amber-100 text-amber-800',
  },
  {
    id: 'muslim',
    slug: 'muslim',
    name: 'Sahih Muslim',
    arabicName: 'صحيح مسلم',
    author: 'Imam Muslim ibn al-Hajjaj',
    arabicAuthor: 'الإمام مسلم بن الحجاج',
    count: 5362,
    description: 'Second most authentic hadith collection, compiled by Imam Muslim. Known for its rigorous methodology.',
    color: 'from-emerald-600 to-emerald-800',
    iconBg: 'bg-emerald-100 text-emerald-800',
  },
  {
    id: 'abudawud',
    slug: 'abudawud',
    name: 'Sunan Abu Dawud',
    arabicName: 'سنن أبي داود',
    author: 'Imam Abu Dawud al-Sijistani',
    arabicAuthor: 'الإمام أبو داود السجستاني',
    count: 4590,
    description: 'Focused primarily on jurisprudential hadiths. A major reference for Islamic law and rulings.',
    color: 'from-blue-600 to-blue-800',
    iconBg: 'bg-blue-100 text-blue-800',
  },
  {
    id: 'tirmidhi',
    slug: 'tirmidhi',
    name: 'Jami al-Tirmidhi',
    arabicName: 'جامع الترمذي',
    author: 'Imam Muhammad ibn Isa al-Tirmidhi',
    arabicAuthor: 'الإمام محمد بن عيسى الترمذي',
    count: 3891,
    description: 'Unique for providing commentary on authenticity of each hadith. Covers all aspects of Islamic jurisprudence.',
    color: 'from-purple-600 to-purple-800',
    iconBg: 'bg-purple-100 text-purple-800',
  },
  {
    id: 'nasai',
    slug: 'nasai',
    name: "Sunan an-Nasa'i",
    arabicName: 'سنن النسائي',
    author: "Imam Ahmad ibn Shu'ayb al-Nasa'i",
    arabicAuthor: 'الإمام أحمد بن شعيب النسائي',
    count: 5662,
    description: "Known for its stringent criticism of narrators. Al-Nasa'i was particularly strict in authenticating chains.",
    color: 'from-teal-600 to-teal-800',
    iconBg: 'bg-teal-100 text-teal-800',
  },
  {
    id: 'ibnmajah',
    slug: 'ibnmajah',
    name: 'Sunan Ibn Majah',
    arabicName: 'سنن ابن ماجه',
    author: 'Imam Muhammad ibn Yazid Ibn Majah',
    arabicAuthor: 'الإمام محمد بن يزيد ابن ماجه',
    count: 4332,
    description: 'Sixth of the six canonical hadith collections. Contains many unique hadiths not found in other collections.',
    color: 'from-rose-600 to-rose-800',
    iconBg: 'bg-rose-100 text-rose-800',
  },
  {
    id: 'malik',
    slug: 'malik',
    name: "Muwatta Imam Malik",
    arabicName: 'موطأ الإمام مالك',
    author: 'Imam Malik ibn Anas',
    arabicAuthor: 'الإمام مالك بن أنس',
    count: 1594,
    description: 'The earliest surviving collection of hadith and the founding legal text of the Maliki school of jurisprudence.',
    color: 'from-orange-600 to-orange-800',
    iconBg: 'bg-orange-100 text-orange-800',
  },
  {
    id: 'ahmed',
    slug: 'ahmed',
    name: 'Musnad Ahmad',
    arabicName: 'مسند أحمد',
    author: 'Imam Ahmad ibn Hanbal',
    arabicAuthor: 'الإمام أحمد بن حنبل',
    count: 3450,
    description: 'One of the largest hadith collections, compiled by the founder of the Hanbali school of jurisprudence.',
    color: 'from-indigo-600 to-indigo-800',
    iconBg: 'bg-indigo-100 text-indigo-800',
  },
  {
    id: 'darimi',
    slug: 'darimi',
    name: 'Sunan al-Darimi',
    arabicName: 'سنن الدارمي',
    author: 'Imam Abdullah ibn Abd al-Rahman al-Darimi',
    arabicAuthor: 'الإمام عبدالله بن عبدالرحمن الدارمي',
    count: 3367,
    description: 'Sometimes referred to as Musnad al-Darimi. An important early collection known for its reliability.',
    color: 'from-cyan-600 to-cyan-800',
    iconBg: 'bg-cyan-100 text-cyan-800',
  },
];

export function getBookBySlug(slug: string): HadithBook | undefined {
  return hadithBooks.find(b => b.slug === slug);
}

export type HadithEntry = {
  id: number;
  idInBook: number;
  chapterId: number;
  bookId: number;
  arabic: string;
  english: {
    narrator: string;
    text: string;
  };
};

export type HadithData = {
  id: number;
  metadata: {
    id: number;
    length: number;
    arabic: { title: string; author: string; introduction: string };
    english: { title: string; author: string; introduction: string };
  };
  chapters: Array<{ id: number; bookId: number; arabic: string; english: string }>;
  hadiths: HadithEntry[];
};

const BASE_URL = 'https://raw.githubusercontent.com/AhmedBaset/hadith-json/main/db/by_book/the_9_books';

export async function fetchHadithData(bookSlug: string): Promise<HadithData> {
  const res = await fetch(`${BASE_URL}/${bookSlug}.json`, {
    next: { revalidate: 86400 }, // cache for 24 hours
  });
  if (!res.ok) throw new Error(`Failed to fetch ${bookSlug}`);
  return res.json();
}
