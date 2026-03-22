'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // TODO: Integrate with NextAuth or your auth provider
    setTimeout(() => {
      setError('Login system coming soon. Please contact the admin for access.');
      setLoading(false);
    }, 800);
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

      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl border border-stone-100">
        <h1 className="font-serif text-3xl font-bold text-stone-900 mb-2">Welcome Back</h1>
        <p className="text-stone-500 text-sm mb-8">Sign in to access your courses and learning materials.</p>

        {error && <div className="bg-amber-50 text-amber-700 text-sm px-4 py-3 rounded-xl mb-6 border border-amber-100">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input required type="email" className="w-full pl-12 pr-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="you@email.com" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input required type="password" className="w-full pl-12 pr-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Your password" value={form.password} onChange={e => setForm(f => ({...f, password: e.target.value}))} />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-emerald-700 text-white py-4 rounded-xl font-bold hover:bg-emerald-800 transition-all text-lg disabled:opacity-60">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-stone-500 mt-6">
          New student?{' '}
          <Link href="/signup" className="text-emerald-700 font-bold hover:underline">Register here</Link>
        </p>
        <p className="text-center text-sm text-stone-500 mt-2">
          Need help?{' '}
          <a href="tel:+923441722419" className="text-emerald-700 font-bold hover:underline">Call +92 344 1722419</a>
        </p>
      </div>
    </main>
  );
}
