import { Shield, Lock, Eye, FileText, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-stone-50 py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-emerald-700 font-medium mb-12 hover:gap-3 transition-all">
          <ChevronLeft className="w-5 h-5" /> Back to Home
        </Link>

        <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl shadow-stone-200/50 border border-stone-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-4xl font-bold text-stone-900">Privacy Policy</h1>
          </div>

          <div className="prose prose-stone max-w-none space-y-8 text-stone-600 leading-relaxed">
            <section>
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Introduction</h2>
              <p>
                At Markaz Al Huda, we are committed to protecting the privacy and security of our students, parents, and staff. This Privacy Policy outlines how we collect, use, and safeguard your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-emerald-600" /> Information We Collect
              </h2>
              <p>
                We may collect personal information such as names, contact details, and academic records during the admission process or through our website inquiry forms. This information is used solely for educational and administrative purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-600" /> Data Security
              </h2>
              <p>
                We implement strict security measures to ensure that your data is protected from unauthorized access, alteration, or disclosure. Access to personal information is restricted to authorized personnel only.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" /> Third-Party Disclosure
              </h2>
              <p>
                Markaz Al Huda does not sell, trade, or otherwise transfer your personal information to third parties without your explicit consent, except as required by law.
              </p>
            </section>

            <section className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100">
              <h2 className="text-xl font-serif font-bold text-emerald-900 mb-2">Contact Us</h2>
              <p className="text-emerald-800">
                If you have any questions regarding this Privacy Policy, please contact us at our main office in Kot Abdullah Qasoor.
              </p>
            </section>
          </div>
        </div>
        
        <p className="text-center text-stone-400 mt-12 text-sm">
          Last Updated: March 2026
        </p>
      </div>
    </main>
  );
}
