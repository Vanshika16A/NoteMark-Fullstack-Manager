"use client"
import Link from 'next/link';
import { BookText, Bookmark, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold mb-4 text-blue-500">NoteMark</h1>
      <p className="text-slate-400 mb-12 text-lg">Your personal space for thoughts and links.</p>
      
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
        <Link href="/notes" className="group p-8 bg-[#0f172a] border border-slate-800 rounded-2xl hover:border-blue-500 transition-all">
          <div className="flex justify-between items-start mb-4">
            <BookText className="text-blue-500" size={40} />
            <ArrowRight className="text-slate-600 group-hover:text-blue-500 transition-colors" />
          </div>
          <h2 className="text-2xl font-bold mb-2">My Notes</h2>
          <p className="text-slate-400 text-sm">Organize your thoughts with tags and search.</p>
        </Link>

        <Link href="/bookmarks" className="group p-8 bg-[#0f172a] border border-slate-800 rounded-2xl hover:border-blue-500 transition-all">
          <div className="flex justify-between items-start mb-4">
            <Bookmark className="text-blue-500" size={40} />
            <ArrowRight className="text-slate-600 group-hover:text-blue-500 transition-colors" />
          </div>
          <h2 className="text-2xl font-bold mb-2">My Bookmarks</h2>
          <p className="text-slate-400 text-sm">Save important URLs and auto-fetch titles.</p>
        </Link>
      </div>
    </div>
  );
}