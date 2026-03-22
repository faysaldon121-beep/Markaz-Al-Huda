'use client';

import { useState, useEffect } from 'react';
import { Lock, Save, LogOut, Video, FileText, Users, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { courses } from '@/lib/courses-data';

type CourseContent = {
  videoUrl?: string;
  pdfUrl?: string;
  zoomLink?: string;
  notes?: string;
};

type ContentMap = Record<string, CourseContent>;

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState('');
  const [content, setContent] = useState<ContentMap>({});
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [activeTab, setActiveTab] = useState(courses[0].slug);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/admin', {
      headers: { 'x-admin-password': password },
    });
    if (res.ok) {
      const data = await res.json();
      setContent(data);
      setAuthed(true);
    } else {
      setAuthError('Wrong password. Try again.');
    }
  }

  async function save() {
    setSaving(true);
    setSaveStatus('idle');
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password,
        },
        body: JSON.stringify(content),
      });
      setSaveStatus(res.ok ? 'success' : 'error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch {
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  }

  function updateField(slug: string, field: keyof CourseContent, value: string) {
    setContent(prev => ({
      ...prev,
      [slug]: { ...prev[slug], [field]: value },
    }));
  }

  if (!authed) {
    return (
      <main className="min-h-screen bg-stone-900 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-10 max-w-sm w-full shadow-2xl">
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-emerald-700" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-center text-stone-900 mb-2">Admin Panel</h1>
          <p className="text-stone-400 text-sm text-center mb-8">Markaz ul Huda — Course Management</p>

          {authError && (
            <div className="flex items-center gap-2 bg-red-50 text-red-700 text-sm px-4 py-3 rounded-xl mb-5 border border-red-100">
              <AlertCircle className="w-4 h-4 flex-shrink-0" /> {authError}
            </div>
          )}

          <form onSubmit={login} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Admin Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                required
              />
              <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <button type="submit" className="w-full bg-emerald-700 text-white py-3 rounded-xl font-bold hover:bg-emerald-800 transition-all">
              Login
            </button>
          </form>
          <p className="text-xs text-stone-400 text-center mt-6">Set your password via <code className="bg-stone-100 px-1 rounded">ADMIN_PASSWORD</code> in .env.local</p>
        </div>
      </main>
    );
  }

  const activeCourse = courses.find(c => c.slug === activeTab)!;
  const activeContent = content[activeTab] || {};

  return (
    <main className="min-h-screen bg-stone-100">
      {/* Header */}
      <header className="bg-emerald-900 text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold">Admin Panel</h1>
          <p className="text-emerald-300 text-sm">Markaz ul Huda — Course Content Manager</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={save}
            disabled={saving}
            className="flex items-center gap-2 bg-white text-emerald-900 px-5 py-2.5 rounded-xl font-bold hover:bg-emerald-50 transition-all disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save All'}
          </button>
          <button onClick={() => setAuthed(false)} className="flex items-center gap-2 text-emerald-300 hover:text-white px-3 py-2 rounded-xl transition-all">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      {/* Save Status Toast */}
      {saveStatus !== 'idle' && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl shadow-xl font-medium text-sm ${saveStatus === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-500 text-white'}`}>
          {saveStatus === 'success' ? <><CheckCircle2 className="w-5 h-5" /> Saved successfully!</> : <><AlertCircle className="w-5 h-5" /> Save failed. Try again.</>}
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 mb-8 text-sm text-amber-800">
          <strong>How to use:</strong> Select a course below, paste your YouTube/Google Drive/Zoom links, then click <strong>Save All</strong>. Changes go live immediately on the site.
        </div>

        {/* Course Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {courses.map(c => (
            <button
              key={c.slug}
              onClick={() => setActiveTab(c.slug)}
              className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${activeTab === c.slug ? 'bg-emerald-700 text-white shadow-md' : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'}`}
            >
              {c.title.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Course Editor */}
        <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm">
          <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">{activeCourse.title}</h2>
          <p className="text-stone-400 text-sm mb-8">{activeCourse.description}</p>

          <div className="space-y-6">
            {/* Video URL */}
            <div className="p-6 bg-stone-50 rounded-2xl border border-stone-100">
              <div className="flex items-center gap-2 mb-3">
                <Video className="w-5 h-5 text-blue-600" />
                <label className="font-bold text-stone-800">Video Lesson URL</label>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">YouTube / Vimeo</span>
              </div>
              <p className="text-xs text-stone-400 mb-3">Paste your YouTube embed link or Vimeo URL. Example: https://youtube.com/embed/VIDEO_ID</p>
              <input
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm font-mono"
                placeholder="https://youtube.com/embed/your-video-id"
                value={activeContent.videoUrl || ''}
                onChange={e => updateField(activeTab, 'videoUrl', e.target.value)}
              />
              {activeContent.videoUrl && (
                <div className="mt-3 rounded-xl overflow-hidden aspect-video">
                  <iframe src={activeContent.videoUrl} className="w-full h-full" allowFullScreen />
                </div>
              )}
            </div>

            {/* PDF URL */}
            <div className="p-6 bg-stone-50 rounded-2xl border border-stone-100">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-red-600" />
                <label className="font-bold text-stone-800">PDF Study Material URL</label>
                <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Google Drive / Direct Link</span>
              </div>
              <p className="text-xs text-stone-400 mb-3">Upload your PDF to Google Drive, click Share → Anyone with link, then paste the link here.</p>
              <input
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm font-mono"
                placeholder="https://drive.google.com/file/d/FILE_ID/view"
                value={activeContent.pdfUrl || ''}
                onChange={e => updateField(activeTab, 'pdfUrl', e.target.value)}
              />
              {activeContent.pdfUrl && (
                <a href={activeContent.pdfUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-3 text-sm text-red-600 font-medium hover:underline">
                  <FileText className="w-4 h-4" /> Preview PDF ↗
                </a>
              )}
            </div>

            {/* Zoom Link */}
            <div className="p-6 bg-stone-50 rounded-2xl border border-stone-100">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-purple-600" />
                <label className="font-bold text-stone-800">Live Class Link</label>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Zoom / Google Meet</span>
              </div>
              <p className="text-xs text-stone-400 mb-3">Paste your Zoom or Google Meet link. Students will see this after enrolling.</p>
              <input
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm font-mono"
                placeholder="https://zoom.us/j/your-meeting-id"
                value={activeContent.zoomLink || ''}
                onChange={e => updateField(activeTab, 'zoomLink', e.target.value)}
              />
            </div>

            {/* Notes */}
            <div className="p-6 bg-stone-50 rounded-2xl border border-stone-100">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-stone-500" />
                <label className="font-bold text-stone-800">Admin Notes (not shown to students)</label>
              </div>
              <textarea
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm h-24"
                placeholder="Any private notes about this course..."
                value={activeContent.notes || ''}
                onChange={e => updateField(activeTab, 'notes', e.target.value)}
              />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-stone-100 flex justify-end">
            <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-800 transition-all disabled:opacity-60">
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save All Changes'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
