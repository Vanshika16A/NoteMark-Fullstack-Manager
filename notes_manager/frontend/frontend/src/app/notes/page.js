"use client"
import { useState, useEffect } from 'react';
import { fetchNotes, createNote, deleteNote } from '@/lib/api';
import { Plus, Search, Trash2, Tag, BookOpen, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [form, setForm] = useState({ 
    title: '', 
    content: '', 
    tags: '' 
  });

  // Load notes from Backend
  const loadNotes = async () => {
    try {
      setLoading(true);
      const { data } = await fetchNotes(search);
      setNotes(data);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    } finally {
      setLoading(false);
    }
  };

  // Re-run search when search state changes
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      loadNotes();
    }, 300); // 300ms debounce to prevent too many API calls
    return () => clearTimeout(delayDebounce);
  }, [search]);

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content) return alert("Title and Content are required");

    try {
      const tagsArray = form.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== "");
      await createNote({ 
        title: form.title, 
        content: form.content, 
        tags: tagsArray 
      });
      
      setForm({ title: '', content: '', tags: '' }); // Reset form
      loadNotes(); // Refresh list
    } catch (err) {
      alert("Error saving note");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this note?")) {
      await deleteNote(id);
      loadNotes();
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation & Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <Link href="/" className="text-blue-500 hover:text-blue-400 flex items-center gap-1 text-sm mb-2 transition-colors">
              <ChevronLeft size={16} /> Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold text-white flex items-center gap-3">
              <BookOpen className="text-blue-500" /> My Notes
            </h1>
          </div>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              className="w-full bg-[#0f172a] border border-slate-800 p-3 pl-10 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200"
              placeholder="Search notes or tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Create Note Sidebar */}
          <section className="lg:col-span-1">
            <div className="bg-[#0f172a] p-6 rounded-2xl border border-slate-800 sticky top-8">
              <h2 className="text-xl mb-6 font-semibold flex items-center gap-2">
                <Plus className="text-blue-500" size={20} /> Create New
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase mb-1 ml-1">Title</label>
                  <input 
                    className="w-full bg-[#020617] border border-slate-700 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Enter title..."
                    value={form.title}
                    onChange={e => setForm({...form, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase mb-1 ml-1">Content</label>
                  <textarea 
                    className="w-full bg-[#020617] border border-slate-700 p-3 rounded-lg h-40 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="Write your thoughts..."
                    value={form.content}
                    onChange={e => setForm({...form, content: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase mb-1 ml-1">Tags (comma separated)</label>
                  <input 
                    className="w-full bg-[#020617] border border-slate-700 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="work, ideas, personal"
                    value={form.tags}
                    onChange={e => setForm({...form, tags: e.target.value})}
                  />
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 mt-4">
                  Save Note
                </button>
              </form>
            </div>
          </section>

          {/* Notes Display Area */}
          <section className="lg:col-span-2">
            {loading ? (
              <div className="text-center py-20 text-slate-500">Loading your notes...</div>
            ) : notes.length === 0 ? (
              <div className="text-center py-20 bg-[#0f172a] rounded-2xl border border-dashed border-slate-800">
                <p className="text-slate-500 italic">No notes found. Create your first one!</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {notes.map(note => (
                  <div key={note._id} className="bg-[#0f172a] p-6 rounded-2xl border border-slate-800 hover:border-blue-900 transition-all group relative overflow-hidden">
                    {/* Blue accent bar on hover */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors">
                        {note.title}
                      </h3>
                      <button 
                        onClick={() => handleDelete(note._id)} 
                        className="text-slate-600 hover:text-red-400 p-1 rounded-md transition-colors"
                        title="Delete note"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <p className="text-slate-300 leading-relaxed whitespace-pre-wrap mb-6">
                      {note.content}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {note.tags && note.tags.map(tag => (
                        <span key={tag} className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold bg-[#1e293b] px-2 py-1 rounded-md text-blue-400 border border-slate-700">
                          <Tag size={10} /> {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-800 text-[10px] text-slate-600 flex justify-end">
                       Created: {new Date(note.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

        </div>
      </div>
    </div>
  );
}