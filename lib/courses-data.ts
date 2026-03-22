export type Course = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  price: number; // in PKR
  duration: string;
  level: string;
  type: 'video' | 'live' | 'pdf' | 'mixed';
  instructor: string;
  lessons: number;
  thumbnail: string;
  features: string[];
  zoomLink?: string;
};

export const COURSES_DATA: Course[] = [
  {
    slug: 'hifz-e-quran',
    title: 'Hifz-e-Quran Complete Program',
    description: 'Complete Quran memorization with structured revision and expert guidance.',
    longDescription: 'Our comprehensive Hifz program is designed to help students memorize the entire Holy Quran with proper Tajweed. Classes are conducted 6 days a week with personalized attention from our qualified Huffaz teachers.',
    price: 2500,
    duration: '3-5 Years',
    level: 'All Levels',
    type: 'mixed',
    instructor: 'Qari Abdur Rahman Al Afin',
    lessons: 0,
    thumbnail: 'https://picsum.photos/seed/hifz/800/500',
    features: ['Live online classes', 'Pre-recorded lessons', 'PDF study material', 'Monthly progress reports', 'Personalized feedback'],
    zoomLink: 'https://zoom.us/j/placeholder',
  },
  {
    slug: 'tajweed-ul-quran',
    title: 'Tajweed-ul-Quran Mastery',
    description: 'Master the rules of Quranic recitation with precision and beauty.',
    longDescription: 'Learn all rules of Tajweed from basics to advanced level. Includes video demonstrations, practice sessions, and live correction classes with certified Tajweed teachers.',
    price: 1500,
    duration: '6 Months',
    level: 'Beginner to Advanced',
    type: 'mixed',
    instructor: 'Qari Abdur Rahman Al Afin',
    lessons: 48,
    thumbnail: 'https://picsum.photos/seed/tajweed/800/500',
    features: ['48 video lessons', 'PDF rules handbook', 'Live correction sessions', 'Practice recordings', 'Certificate on completion'],
    zoomLink: 'https://zoom.us/j/placeholder',
  },
  {
    slug: 'maariful-quran',
    title: 'Maariful Quran — Tafseer Course',
    description: 'Deep understanding and exegesis of the Holy Quran for practical life.',
    longDescription: 'Based on the famous Maariful Quran by Mufti Muhammad Shafi, this course provides deep insight into Quranic verses, their context, and practical applications in daily life.',
    price: 1800,
    duration: '1 Year',
    level: 'Intermediate',
    type: 'mixed',
    instructor: 'Qari Abdur Rahman Al Afin',
    lessons: 120,
    thumbnail: 'https://picsum.photos/seed/tafseer/800/500',
    features: ['120 video lessons', 'PDF notes per Surah', 'Weekly live Q&A', 'Discussion forum', 'Certificate on completion'],
    zoomLink: 'https://zoom.us/j/placeholder',
  },
  {
    slug: 'manzil-revision',
    title: 'Manzil — Revision Program',
    description: 'Structured revision and consolidation for Huffaz students.',
    longDescription: 'Specifically designed for students who have completed Hifz and need structured revision. Follow a daily Manzil schedule with accountability and teacher supervision.',
    price: 1000,
    duration: 'Ongoing',
    level: 'Huffaz Only',
    type: 'live',
    instructor: 'Qari Abdur Rahman Al Afin',
    lessons: 0,
    thumbnail: 'https://picsum.photos/seed/manzil/800/500',
    features: ['Daily live sessions', 'Progress tracking', 'Tajweed correction', 'Flexible schedule', 'Monthly assessment'],
    zoomLink: 'https://zoom.us/j/placeholder',
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find(c => c.slug === slug);
}
