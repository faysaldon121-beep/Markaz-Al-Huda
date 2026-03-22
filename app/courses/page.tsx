import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Video, FileText, Users, Clock, Star, PlayCircle } from 'lucide-react';
import Logo from '@/components/Logo';
import { courses } from '@/lib/courses-data';
import CourseEnrollButton from '@/components/CourseEnrollButton';

export const metadata: Metadata = {
  title: 'Online Quran Courses',
  description: 'Browse and enroll in Hifz, Tajweed, Maariful Quran, and Manzil courses at Markaz ul Huda. Online and in-person programs available.',
};

const typeIcons: Record<string, React.ReactNode> = {
  video: <Video className="w-4 h-4" />,
  live: <Users className="w-4 h-4" />,
  pdf: <FileText className="w-4 h-4" />,
  mixed: <PlayCircle className="w-4 h-4" />,
};

const typeLabels: Record<string, string> = {
  video: 'Pre-recorded',
  live: 'Live Classes',
  pdf: 'PDF Material',
  mixed: 'All Formats',
};

export default function CoursesPage() {
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
              <Link href="/hadiths" className="text-sm font-medium text-stone-600 hover:text-emerald-700 transition-colors">Hadiths</Link>
              <Link href="/login" className="text-sm font-medium text-stone-600 hover:text-emerald-700 transition-colors">Login</Link>
              <Link href="/signup" className="bg-green-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-green-700 transition-all shadow-md">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-emerald-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1 bg-emerald-800 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-emerald-700">
            Online Learning Portal
          </span>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold mb-6">Our Courses</h1>
          <p className="text-emerald-100/80 text-lg max-w-2xl mx-auto">
            Learn Quran from certified teachers. Pre-recorded lessons, live sessions, and PDF materials — all in one place.
          </p>
        </div>
      </section>

      {/* Payment Info Banner */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-center gap-6 text-sm">
          <span className="flex items-center gap-2 text-amber-800 font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
            Accepts: JazzCash · EasyPaisa · PayFast · Bank Transfer
          </span>
          <span className="text-amber-700">Payment verified within 24 hours · Cancel anytime</span>
        </div>
      </div>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {courses.map((course) => (
              <article key={course.slug} className="bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 group">
                <Link href={`/courses/${course.slug}`} className="block">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="flex items-center gap-1.5 bg-white/90 backdrop-blur text-stone-800 text-xs font-bold px-3 py-1.5 rounded-full">
                        {typeIcons[course.type]} {typeLabels[course.type]}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="text-white/80 text-sm flex items-center gap-1.5">
                        <Clock className="w-4 h-4" /> {course.duration}
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <Link href={`/courses/${course.slug}`}>
                      <h2 className="font-serif text-2xl font-bold text-stone-900 leading-tight hover:text-emerald-700 transition-colors">{course.title}</h2>
                    </Link>
                  </div>
                  <p className="text-stone-500 text-sm mb-6 leading-relaxed">{course.description}</p>

                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                    <span className="text-xs text-stone-400 font-medium">5.0 Rating</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {course.features.slice(0, 3).map(f => (
                      <span key={f} className="text-xs bg-stone-100 text-stone-600 px-3 py-1 rounded-full">{f}</span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-stone-100">
                    <div>
                      <p className="text-xs text-stone-400 font-medium mb-0.5">Monthly Fee</p>
                      <p className="text-2xl font-bold text-emerald-700">PKR {course.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/courses/${course.slug}`}
                        className="text-emerald-700 border border-emerald-200 px-4 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-all flex items-center gap-2 text-sm"
                      >
                        <BookOpen className="w-4 h-4" /> Details
                      </Link>
                      <CourseEnrollButton course={course} />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-10 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-stone-400 text-sm">© 2026 Markaz ul Huda. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4 text-sm text-stone-500">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/admissions" className="hover:text-white transition-colors">Admissions</Link>
            <Link href="/hadiths" className="hover:text-white transition-colors">Hadiths</Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
