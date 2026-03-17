'use client';

import { useState } from 'react';
import { BookOpen, GraduationCap, Heart, MapPin, Phone, Mail, Clock, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import Logo from '@/components/Logo';

const programs = [
  {
    title: "Hifz-e-Quran",
    description: "Comprehensive Quran memorization program with focus on retention and spiritual growth.",
    icon: <BookOpen className="w-6 h-6" />,
    color: "bg-emerald-100 text-emerald-700"
  },
  {
    title: "Tajweed-ul-Quran",
    description: "Mastering the art of Quranic recitation with precise pronunciation and rules.",
    icon: <GraduationCap className="w-6 h-6" />,
    color: "bg-amber-100 text-amber-700"
  },
  {
    title: "Manzil",
    description: "Structured revision and consolidation of memorized portions to ensure perfection.",
    icon: <Clock className="w-6 h-6" />,
    color: "bg-blue-100 text-blue-700"
  },
  {
    title: "Maariful Quran",
    description: "Deep understanding and exegesis of the Holy Quran for practical life application.",
    icon: <Heart className="w-6 h-6" />,
    color: "bg-rose-100 text-rose-700"
  }
];

export default function Home() {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2 group cursor-pointer">
              <Logo className="w-14 h-14" />
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-tight text-slate-800 leading-none">Markaz ul Huda</span>
                <span className="text-[10px] font-medium tracking-[0.1em] text-green-600 uppercase mt-1">we muslimate</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
              <a href="#about" className="hover:text-emerald-700 transition-colors">About</a>
              <a href="#programs" className="hover:text-emerald-700 transition-colors">Programs</a>
              <a href="/admissions" className="hover:text-emerald-700 transition-colors">Admissions</a>
              <a href="#contact" className="hover:text-emerald-700 transition-colors">Contact</a>
              <button 
                onClick={() => setIsDonationModalOpen(true)}
                className="bg-green-600 text-white px-6 py-2.5 rounded-full hover:bg-green-700 transition-all shadow-md hover:shadow-lg border border-green-500/20"
              >
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-green-100">
                Welcome to Markaz ul Huda
              </span>
              <h1 className="font-serif text-5xl lg:text-7xl font-bold text-slate-800 leading-[1.1] mb-6">
                Nurturing Souls with the <span className="text-green-600">Light of Quran</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
                Dedicated to excellence in Islamic education. We provide a spiritual environment for Hifz, Tajweed, and deep Quranic understanding in Kot Abdullah Qasoor.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-all flex items-center gap-2 shadow-xl shadow-green-600/20">
                  Explore Programs <ChevronRight className="w-5 h-5 text-green-200" />
                </button>
                <button className="bg-white text-stone-900 border border-stone-200 px-8 py-4 rounded-xl font-bold hover:bg-stone-50 transition-all">
                  Our Mission
                </button>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative">
                <Image 
                  src="https://picsum.photos/seed/islamic-school/800/1000" 
                  alt="Islamic School Environment"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <p className="font-serif text-2xl italic">&quot;The best among you are those who learn the Quran and teach it.&quot;</p>
                  <p className="text-sm mt-2 opacity-80">— Prophet Muhammad (PBUH)</p>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-amber-200/50 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-emerald-200/50 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-stone-900 mb-6">Our Core Programs</h2>
            <p className="text-stone-600 text-lg">
              We offer a structured curriculum designed to help students master the Holy Quran and its teachings with devotion and precision.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program, index) => (
              <motion.div 
                key={program.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-3xl border border-stone-100 bg-stone-50 hover:bg-white hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300"
              >
                <div className={`w-14 h-14 ${program.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {program.icon}
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-900 mb-4">{program.title}</h3>
                <p className="text-stone-600 leading-relaxed">
                  {program.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Location Section */}
      <section id="about" className="py-24 bg-stone-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="aspect-square rounded-3xl overflow-hidden relative border-8 border-stone-800">
                <Image 
                  src="https://picsum.photos/seed/quran-study/800/800" 
                  alt="Quran Study"
                  fill
                  className="object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-8">Rooted in Tradition, Focused on Excellence</h2>
              <p className="text-stone-400 text-lg mb-8 leading-relaxed">
                Markaz Al Huda is more than just a school; it&apos;s a community dedicated to the preservation of Islamic knowledge. Located in the heart of Kot Abdullah Qasoor, we provide a serene environment conducive to spiritual growth and academic rigor.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-stone-800 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Our Address</h4>
                    <p className="text-stone-400">Kot Abdullah Qasoor, Pakistan</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-stone-800 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Contact Us</h4>
                    <p className="text-stone-400">Qari Abdur Rahman Al Afin</p>
                    <p className="text-stone-400">+92 344 1722419</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </section>

      {/* Contact / Admission Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-900 rounded-[3rem] p-8 lg:p-16 text-white relative overflow-hidden">
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-6">Begin Your Spiritual Journey Today</h2>
                <p className="text-emerald-100/80 text-lg mb-8">
                  Admissions are now open for the new academic session. Join us at Markaz Al Huda and let your children grow under the shade of Quranic wisdom.
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                    <span>Hifz & Tajweed Classes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                    <span>Evening Maariful Quran Sessions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                    <span>Weekend Manzil Revision</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-3xl p-8 text-stone-900">
                <h3 className="text-2xl font-bold mb-6">Inquiry Form</h3>
                <form className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-600 mb-1">Parent Name</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-600 mb-1">Phone Number</label>
                      <input type="tel" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="+92 ..." />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1">Program of Interest</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-white">
                      <option>Hifz-e-Quran</option>
                      <option>Tajweed-ul-Quran</option>
                      <option>Manzil</option>
                      <option>Maariful Quran</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1">Message (Optional)</label>
                    <textarea className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all h-24" placeholder="Your message..."></textarea>
                  </div>
                  <button className="w-full bg-emerald-700 text-white py-4 rounded-xl font-bold hover:bg-emerald-800 transition-all shadow-lg shadow-emerald-900/20">
                    Submit Inquiry
                  </button>
                </form>
              </div>
            </div>
            {/* Decorative circles */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-800 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-800 rounded-full blur-3xl" />
          </div>
        </div>
      </section>

      {/* Donation Modal */}
      <AnimatePresence>
        {isDonationModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2rem] max-w-lg w-full p-8 relative shadow-2xl"
            >
              <button 
                onClick={() => setIsDonationModalOpen(false)}
                className="absolute top-6 right-6 text-stone-400 hover:text-stone-900 transition-colors"
              >
                <ChevronRight className="w-6 h-6 rotate-180" />
              </button>
              
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 fill-current" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-slate-900">Support Our Mission</h3>
                <p className="text-slate-600 mt-2">Invest in the future of our students. Donate now to Markaz ul Huda.</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Bank Name</p>
                  <p className="font-medium text-slate-900">Markaz ul Huda Kot Abdullah, Qasoor</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Account Title</p>
                  <p className="font-medium text-slate-900">ALLAH Mafi</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">IBAN</p>
                  <p className="font-mono text-green-700 font-bold break-all">PK71MUCB1651244871012691</p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-slate-500 mb-6">Contact us for more details or confirmation of your donation.</p>
                <button 
                  onClick={() => setIsDonationModalOpen(false)}
                  className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-stone-50 border-t border-stone-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <Logo className="w-10 h-10" />
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold tracking-tight text-slate-800 leading-none">Markaz ul Huda</span>
                <span className="text-[8px] font-medium tracking-[0.1em] text-green-600 uppercase">we muslimate</span>
              </div>
            </div>
            <div className="flex gap-8 text-sm text-stone-500">
              <a href="/privacy-policy" className="hover:text-emerald-700 transition-colors">Privacy Policy</a>
              <a href="/admissions" className="hover:text-emerald-700 transition-colors">Admissions</a>
              <a href="#contact" className="hover:text-emerald-700 transition-colors">Contact</a>
            </div>
            <p className="text-sm text-stone-400">
              © 2026 Markaz Al Huda. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
