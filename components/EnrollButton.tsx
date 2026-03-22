'use client';

import { useState } from 'react';
import { X, CreditCard, Smartphone, Building2, CheckCircle2 } from 'lucide-react';
import { Course } from '@/lib/courses-data';

export default function EnrollButton({ course }: { course: Course }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'method' | 'details' | 'confirm' | 'done'>('method');
  const [method, setMethod] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', txnId: '' });
  const [loading, setLoading] = useState(false);

  const methods = [
    { id: 'jazzcash', label: 'JazzCash', icon: <Smartphone className="w-5 h-5" />, color: 'bg-red-50 border-red-200 text-red-700', account: '0348-6596339', note: 'Send to JazzCash: 0348-6596339' },
    { id: 'easypaisa', label: 'EasyPaisa', icon: <Smartphone className="w-5 h-5" />, color: 'bg-green-50 border-green-200 text-green-700', account: '0347-6535805', note: 'Send to EasyPaisa: 0347-6535805' },
    { id: 'payfast', label: 'PayFast (Card)', icon: <CreditCard className="w-5 h-5" />, color: 'bg-blue-50 border-blue-200 text-blue-700', account: '', note: 'Pay with Visa/Mastercard via PayFast' },
    { id: 'bank', label: 'Bank Transfer', icon: <Building2 className="w-5 h-5" />, color: 'bg-stone-50 border-stone-200 text-stone-700', account: 'PK71MUCB1651244871012691', note: 'IBAN: PK71MUCB1651244871012691 · Account: ALLAH Mafi' },
  ];

  const selectedMethod = methods.find(m => m.id === method);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: form.name,
          studentEmail: form.email,
          courseTitle: course.title,
          paymentMethod: method,
          transactionId: form.txnId,
          amount: course.price,
        }),
      });
      setStep('done');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => { setIsOpen(true); setStep('method'); }}
        className="w-full bg-emerald-700 text-white py-4 rounded-xl font-bold hover:bg-emerald-800 transition-all shadow-lg shadow-emerald-900/20 text-lg"
      >
        Enroll Now
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-stone-400 hover:text-stone-900">
              <X className="w-6 h-6" />
            </button>

            {step === 'method' && (
              <>
                <h3 className="font-serif text-2xl font-bold mb-2">Choose Payment Method</h3>
                <p className="text-stone-500 text-sm mb-6">Enrolling in: <strong>{course.title}</strong> · PKR {course.price.toLocaleString()}/month</p>
                <div className="space-y-3">
                  {methods.map(m => (
                    <button
                      key={m.id}
                      onClick={() => { setMethod(m.id); setStep('details'); }}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all hover:shadow-md ${m.color}`}
                    >
                      {m.icon}
                      <div className="text-left">
                        <p className="font-bold">{m.label}</p>
                        <p className="text-xs opacity-70">{m.note}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 'details' && selectedMethod && (
              <>
                <h3 className="font-serif text-2xl font-bold mb-2">Payment Instructions</h3>
                <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 mb-6">
                  <p className="text-sm font-bold text-stone-500 uppercase tracking-widest mb-1">Send PKR {course.price.toLocaleString()} to:</p>
                  <p className="font-mono text-emerald-700 font-bold break-all">{selectedMethod.account || 'PayFast checkout link will be provided'}</p>
                  <p className="text-xs text-stone-400 mt-2">{selectedMethod.note}</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-stone-600 block mb-1">Your Full Name</label>
                    <input className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Muhammad Ali" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-stone-600 block mb-1">Email Address</label>
                    <input type="email" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="you@email.com" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-stone-600 block mb-1">Phone Number</label>
                    <input className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="+92 300 0000000" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-stone-600 block mb-1">Transaction ID / Reference</label>
                    <input className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="TXN123456789" value={form.txnId} onChange={e => setForm(f => ({...f, txnId: e.target.value}))} />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep('method')} className="flex-1 py-3 rounded-xl border border-stone-200 font-bold text-stone-600 hover:bg-stone-50">Back</button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !form.name || !form.email || !form.txnId}
                    className="flex-2 flex-grow py-3 rounded-xl bg-emerald-700 text-white font-bold hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Submitting...' : 'Submit Enrollment'}
                  </button>
                </div>
              </>
            )}

            {step === 'done' && (
              <div className="text-center py-6">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
                <h3 className="font-serif text-2xl font-bold mb-3">Enrollment Submitted!</h3>
                <p className="text-stone-500 mb-6">
                  We have received your enrollment for <strong>{course.title}</strong>. Our team will verify your payment and send you course access within <strong>24 hours</strong> to your email.
                </p>
                <p className="text-sm text-stone-400 mb-8">Questions? Call: <a href="tel:+923441722419" className="text-emerald-700 font-bold">+92 344 1722419</a></p>
                <button onClick={() => setIsOpen(false)} className="w-full bg-stone-900 text-white py-3 rounded-xl font-bold hover:bg-stone-800">Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
