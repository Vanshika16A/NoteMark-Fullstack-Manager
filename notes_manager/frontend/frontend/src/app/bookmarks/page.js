"use client"
import { useState, useEffect } from 'react';
import { fetchBookmarks, createBookmark, deleteBookmark } from '@/lib/api';
import { Bookmark, Search, Trash2, ExternalLink, Plus } from 'lucide-react';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [search, setSearch] = useState('');
  const [url, setUrl] = useState('');

  const loadData = async () => {
    try {
      const { data } = await fetchBookmarks(search);
      setBookmarks(data);
    } catch (err) { console.error("Error loading bookmarks"); }
  };

  useEffect(() => { loadData(); }, [search]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if(!url) return;
    await createBookmark({ url });
    setUrl('');
    loadData();
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-500 flex items-center gap-2">
            <Bookmark /> Bookmarks
          </h1>
          <form onSubmit={handleAdd} className="flex gap-2">
            <input 
              className="bg-[#0f172a] border border-slate-800 p-2 rounded w-64 focus:border-blue-500 outline-none"
              placeholder="Paste URL here..."
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
            <button className="bg-blue-600 hover:bg-blue-500 p-2 rounded text-white px-4 flex items-center gap-1">
              <Plus size={18}/> Add
            </button>
          </form>
        </header>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 text-slate-500" size={18} />
          <input 
            className="w-full bg-[#0f172a] border border-slate-800 p-3 pl-10 rounded-lg focus:border-blue-500 outline-none"
            placeholder="Search bookmarks..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid gap-4">
          {bookmarks.map(bm => (
            <div key={bm._id} className="bg-[#0f172a] p-5 rounded-xl border border-slate-800 hover:border-blue-900 transition flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-white">{bm.title || bm.url}</h3>
                <p className="text-slate-500 text-sm truncate max-w-md">{bm.url}</p>
              </div>
              <div className="flex gap-4">
                <a href={bm.url} target="_blank" className="text-blue-400 hover:text-blue-300">
                  <ExternalLink size={20} />
                </a>
                <button onClick={() => deleteBookmark(bm._id).then(loadData)} className="text-slate-600 hover:text-red-400">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}