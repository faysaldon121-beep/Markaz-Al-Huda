import { GraduationCap, CheckCircle2, Calendar, BookOpen, ChevronLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/components/Logo';

export default function Admissions() {
  return (
    <main className="min-h-screen bg-slate-50 py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-green-700 font-medium hover:gap-3 transition-all">
            <ChevronLeft className="w-5 h-5" /> Back to Home
          </Link>
          <Link href="/" className="flex items-center gap-2 group">
            <Logo className="w-12 h-12" />
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-tight text-slate-800 leading-none">Markaz ul Huda</span>
              <span className="text-[8px] uppercase tracking-[0.1em] text-green-600 font-medium mt-0.5">we muslimate</span>
            </div>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-green-50 text-green-700 rounded-xl flex items-center justify-center border border-green-100">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h1 className="font-serif text-4xl font-bold text-slate-800">Admissions 2026</h1>
              </div>

              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                Join our vibrant community of learners. We are now accepting applications for the upcoming academic session. Our admission process is designed to identify students who are eager to learn and grow in a spiritual environment.
              </p>

              <div className="space-y-6">
                <h2 className="text-2xl font-serif font-bold text-slate-800">Admission Process</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Submit Inquiry Form",
                    "Initial Interview",
                    "Assessment Test",
                    "Document Verification",
                    "Final Approval",
                    "Fee Submission"
                  ].map((step, i) => (
                    <div key={step} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {i + 1}
                      </span>
                      <span className="font-medium text-slate-700">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-600/10 blur-[100px] -mr-32 -mt-32"></div>
              <h2 className="text-2xl font-serif font-bold mb-6 relative z-10">Required Documents</h2>
              <ul className="space-y-4 relative z-10">
                {[
                  "Original Birth Certificate / B-Form",
                  "Previous School Leaving Certificate (if applicable)",
                  "Two Recent Passport Size Photographs",
                  "Copy of Parent/Guardian CNIC",
                  "Medical Fitness Certificate"
                ].map((doc) => (
                  <li key={doc} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-slate-300">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
              <h3 className="text-xl font-serif font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" /> Important Dates
              </h3>
              <div className="space-y-4">
                <div className="pb-4 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Registration Starts</p>
                  <p className="font-medium text-slate-900">April 1st, 2026</p>
                </div>
                <div className="pb-4 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Last Date to Apply</p>
                  <p className="font-medium text-slate-900">May 15th, 2026</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Classes Begin</p>
                  <p className="font-medium text-slate-900">June 1st, 2026</p>
                </div>
              </div>
            </div>

            <div className="bg-green-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
              <div className="absolute inset-0 bg-slate-900 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <BookOpen className="w-12 h-12 text-green-200 mb-6" />
              <h3 className="text-xl font-serif font-bold mb-4">Scholarships</h3>
              <p className="text-green-50 text-sm mb-6">
                Merit-based and need-based scholarships are available for deserving students. Contact the administration for more details.
              </p>
              <button className="w-full bg-white text-green-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-50 transition-all">
                Learn More <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
