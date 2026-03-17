import { Shield, Lock, Eye, FileText, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/components/Logo';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-slate-50 py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-green-50 text-green-700 rounded-xl flex items-center justify-center border border-green-100">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-4xl font-bold text-slate-800">Privacy Policy</h1>
          </div>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">Introduction</h2>
              <p>
                At Markaz ul Huda, we are committed to protecting the privacy and security of our students, parents, and staff. This Privacy Policy outlines how we collect, use, and safeguard your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-green-600" /> Information We Collect
              </h2>
              <p>
                We may collect personal information such as names, contact details, and academic records during the admission process or through our website inquiry forms. This information is used solely for educational and administrative purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-green-600" /> Data Security
              </h2>
              <p>
                We implement strict security measures to ensure that your data is protected from unauthorized access, alteration, or disclosure. Access to personal information is restricted to authorized personnel only.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-600" /> Third-Party Disclosure
              </h2>
              <p>
                Markaz ul Huda does not sell, trade, or otherwise transfer your personal information to third parties without your explicit consent, except as required by law.
              </p>
            </section>

            <section className="bg-green-50 p-8 rounded-2xl border border-green-100">
              <h2 className="text-xl font-serif font-bold text-green-900 mb-2">Contact Us</h2>
              <p className="text-green-800">
                If you have any questions regarding this Privacy Policy, please contact us at our main office in Kot Abdullah Qasoor.
              </p>
            </section>
          </div>
        </div>
        
        <p className="text-center text-slate-400 mt-12 text-sm">
          Last Updated: March 2026
        </p>
      </div>
    </main>
  );
}
