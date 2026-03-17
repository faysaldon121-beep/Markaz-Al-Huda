import { GraduationCap, CheckCircle2, Calendar, BookOpen, ChevronLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Admissions() {
  return (
    <main className="min-h-screen bg-stone-50 py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-emerald-700 font-medium mb-12 hover:gap-3 transition-all">
          <ChevronLeft className="w-5 h-5" /> Back to Home
        </Link>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-stone-200/50 border border-stone-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h1 className="font-serif text-4xl font-bold text-stone-900">Admissions 2026</h1>
              </div>

              <p className="text-stone-600 text-lg leading-relaxed mb-8">
                Join our vibrant community of learners. We are now accepting applications for the upcoming academic session. Our admission process is designed to identify students who are eager to learn and grow in a spiritual environment.
              </p>

              <div className="space-y-6">
                <h2 className="text-2xl font-serif font-bold text-stone-900">Admission Process</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Submit Inquiry Form",
                    "Initial Interview",
                    "Assessment Test",
                    "Document Verification",
                    "Final Approval",
                    "Fee Submission"
                  ].map((step, i) => (
                    <div key={step} className="flex items-center gap-3 p-4 bg-stone-50 rounded-xl border border-stone-100">
                      <span className="w-8 h-8 bg-emerald-700 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {i + 1}
                      </span>
                      <span className="font-medium text-stone-700">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-emerald-900 rounded-[2.5rem] p-8 md:p-12 text-white">
              <h2 className="text-2xl font-serif font-bold mb-6">Required Documents</h2>
              <ul className="space-y-4">
                {[
                  "Original Birth Certificate / B-Form",
                  "Previous School Leaving Certificate (if applicable)",
                  "Two Recent Passport Size Photographs",
                  "Copy of Parent/Guardian CNIC",
                  "Medical Fitness Certificate"
                ].map((doc) => (
                  <li key={doc} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                    <span className="text-emerald-100">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-stone-200/50 border border-stone-100">
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" /> Important Dates
              </h3>
              <div className="space-y-4">
                <div className="pb-4 border-b border-stone-100">
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Registration Starts</p>
                  <p className="font-medium text-stone-900">April 1st, 2026</p>
                </div>
                <div className="pb-4 border-b border-stone-100">
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Last Date to Apply</p>
                  <p className="font-medium text-stone-900">May 15th, 2026</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Classes Begin</p>
                  <p className="font-medium text-stone-900">June 1st, 2026</p>
                </div>
              </div>
            </div>

            <div className="bg-stone-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
              <BookOpen className="w-12 h-12 text-emerald-500 mb-6" />
              <h3 className="text-xl font-serif font-bold mb-4">Scholarships</h3>
              <p className="text-stone-400 text-sm mb-6">
                Merit-based and need-based scholarships are available for deserving students. Contact the administration for more details.
              </p>
              <button className="w-full bg-white text-stone-900 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-stone-100 transition-all">
                Learn More <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
