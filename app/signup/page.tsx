'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { CheckCircle2 } from 'lucide-react';

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', cnic: '', city: '', courseInterest: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) setDone(true);
      else setError(data.error || 'Something went wrong.');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-stone-50 flex flex-col items-center justify-center py-16 px-4">
      <Link href="/" className="flex items-center gap-2 mb-10">
        <Logo className="w-12 h-12" />
        <div>
          <p className="font-serif text-xl font-bold text-slate-800 leading-none">Markaz ul Huda</p>
          <p className="text-[9px] font-medium tracking-[0.1em] text-green-600 uppercase">we muslimate</p>
        </div>
      </Link>

      {done ? (
        <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-xl border border-stone-100">
          <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
          <h2 className="font-serif text-3xl font-bold mb-4">Registration Submitted!</h2>
          <p className="text-stone-500 mb-6">
            Thank you for registering. Your details have been sent to the administration. You will receive an email once your account is approved.
          </p>
          <Link href="/courses" className="block w-full bg-emerald-700 text-white py-3 rounded-xl font-bold hover:bg-emerald-800 transition-all text-center">
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-xl border border-stone-100">
          <h1 className="font-serif text-3xl font-bold text-stone-900 mb-2">Create Account</h1>
          <p className="text-stone-500 text-sm mb-8">Your account will be reviewed and approved by our administration before you can access courses.</p>

          {error && <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-xl mb-6 border border-red-100">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-1">Full Name *</label>
                <input required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Muhammad Ali" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-1">Phone *</label>
                <input required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="+92 300 0000000" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-600 mb-1">Email Address *</label>
              <input required type="email" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="you@email.com" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-1">CNIC / B-Form *</label>
                <input required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="12345-1234567-1" value={form.cnic} onChange={e => setForm(f => ({...f, cnic: e.target.value}))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-1">City</label>
                <input className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Qasoor" value={form.city} onChange={e => setForm(f => ({...f, city: e.target.value}))} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-600 mb-1">Course of Interest</label>
              <select className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-white" value={form.courseInterest} onChange={e => setForm(f => ({...f, courseInterest: e.target.value}))}>
                <option value="">Select a course...</option>
                <option>Hifz-e-Quran</option>
                <option>Tajweed-ul-Quran</option>
                <option>Maariful Quran</option>
                <option>Manzil Revision</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-600 mb-1">Password *</label>
              <input required type="password" minLength={8} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Min 8 characters" value={form.password} onChange={e => setForm(f => ({...f, password: e.target.value}))} />
            </div>

            <button type="submit" disabled={loading} className="w-full bg-emerald-700 text-white py-4 rounded-xl font-bold hover:bg-emerald-800 transition-all text-lg disabled:opacity-60">
              {loading ? 'Submitting...' : 'Submit Registration'}
            </button>
          </form>

          <p className="text-center text-sm text-stone-500 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-emerald-700 font-bold hover:underline">Login</Link>
          </p>
        </div>
      )}
    </main>
  );
}
