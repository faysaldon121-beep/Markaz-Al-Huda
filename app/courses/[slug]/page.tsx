import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Clock, Users, BookOpen, CheckCircle2, Video, FileText, ChevronLeft, PlayCircle } from 'lucide-react';
import Logo from '@/components/Logo';
import { courses, getCourseBySlug } from '@/lib/courses-data';
import EnrollButton from '@/components/EnrollButton';

export async function generateStaticParams() {
  return courses.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return { title: 'Course Not Found' };
  return {
    title: course.title,
    description: course.description,
    openGraph: {
      title: `${course.title} | Markaz ul Huda`,
      description: course.description,
      images: [{ url: course.thumbnail }],
    },
  };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link href="/courses" className="flex items-center gap-2 text-green-700 font-medium hover:gap-3 transition-all">
              <ChevronLeft className="w-5 h-5" /> All Courses
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="relative rounded-3xl overflow-hidden aspect-video shadow-xl">
              <Image src={course.thumbnail} alt={course.title} fill className="object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-stone-900/50 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border border-white/30">
                  <PlayCircle className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                Preview Available After Enrollment
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-stone-100 shadow-sm">
              <h1 className="font-serif text-4xl font-bold text-stone-900 mb-4">{course.title}</h1>
              <p className="text-stone-600 text-lg leading-relaxed mb-8">{course.longDescription}</p>

              <h2 className="font-serif text-2xl font-bold text-stone-900 mb-6">What You&apos;ll Get</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {course.features.map(f => (
                  <div key={f} className="flex items-center gap-3 p-4 bg-stone-50 rounded-xl border border-stone-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-stone-700 font-medium">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-emerald-900 rounded-3xl p-8 text-white">
              <h2 className="font-serif text-2xl font-bold mb-4">About Your Instructor</h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-emerald-800 rounded-2xl flex items-center justify-center">
                  <Users className="w-8 h-8 text-emerald-300" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{course.instructor}</h3>
                  <p className="text-emerald-200 text-sm">Certified Qari & Hafiz-ul-Quran</p>
                  <p className="text-emerald-200 text-sm">Markaz ul Huda, Kot Abdullah Qasoor</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-stone-100 shadow-sm sticky top-28">
              <p className="text-sm text-stone-400 font-medium mb-1">Monthly Fee</p>
              <p className="text-4xl font-bold text-emerald-700 mb-2">PKR {course.price.toLocaleString()}</p>
              <p className="text-xs text-stone-400 mb-8">Billed monthly · Cancel anytime</p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-5 h-5 text-emerald-600" />
                  <span className="text-stone-600">Duration: <strong className="text-stone-900">{course.duration}</strong></span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  <span className="text-stone-600">Level: <strong className="text-stone-900">{course.level}</strong></span>
                </div>
                {course.lessons > 0 && (
                  <div className="flex items-center gap-3 text-sm">
                    <Video className="w-5 h-5 text-emerald-600" />
                    <span className="text-stone-600">Lessons: <strong className="text-stone-900">{course.lessons} videos</strong></span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  <span className="text-stone-600">Materials: <strong className="text-stone-900">PDF included</strong></span>
                </div>
              </div>

              <EnrollButton course={course} />

              <p className="text-xs text-stone-400 text-center mt-4">
                Payment verified manually within 24 hours
              </p>

              <div className="mt-6 pt-6 border-t border-stone-100 text-center">
                <p className="text-sm text-stone-500">Questions? Call us</p>
                <a href="tel:+923441722419" className="text-emerald-700 font-bold text-sm">+92 344 1722419</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
