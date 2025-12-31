
import React, { useState } from 'react';
// Added BookOpen to the lucide-react imports
import { Plus, Search, Trash2, Save, FileText, Clock, Palette, BookOpen } from 'lucide-react';
import { Note } from '../types';

interface NotebookProps {
  notes: Note[];
  onAddNote: () => void;
  onUpdateNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
}

const Notebook: React.FC<NotebookProps> = ({ notes, onAddNote, onUpdateNote, onDeleteNote }) => {
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(notes[0]?.id || null);
  const [searchTerm, setSearchTerm] = useState('');

  const selectedNote = notes.find(n => n.id === selectedNoteId);

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    n.content.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const handleContentChange = (content: string) => {
    if (selectedNote) {
      onUpdateNote({
        ...selectedNote,
        content,
        updatedAt: new Date().toLocaleString('zh-CN')
      });
    }
  };

  const handleTitleChange = (title: string) => {
    if (selectedNote) {
      onUpdateNote({
        ...selectedNote,
        title,
        updatedAt: new Date().toLocaleString('zh-CN')
      });
    }
  };

  const handleColorChange = (color: string) => {
    if (selectedNote) {
      onUpdateNote({
        ...selectedNote,
        color,
        updatedAt: new Date().toLocaleString('zh-CN')
      });
    }
  };

  const colors = [
    { name: 'Indigo', class: 'bg-indigo-500' },
    { name: 'Rose', class: 'bg-rose-400' },
    { name: 'Amber', class: 'bg-amber-400' },
    { name: 'Emerald', class: 'bg-emerald-400' },
    { name: 'Slate', class: 'bg-slate-400' }
  ];

  return (
    <div className="h-full flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-800 font-accent">随手笔记</h2>
        <button 
          onClick={() => {
            onAddNote();
            // Optional: select the new note automatically if we had its ID
          }}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-indigo-100"
        >
          <Plus size={18} />
          新建笔记
        </button>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Notes Sidebar */}
        <div className="w-80 flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="搜索笔记..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-slate-100 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
            />
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note) => (
                <button
                  key={note.id}
                  onClick={() => setSelectedNoteId(note.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    selectedNoteId === note.id 
                      ? 'bg-white border-indigo-200 shadow-md ring-1 ring-indigo-50' 
                      : 'bg-white/50 border-transparent hover:bg-white hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${note.color}`}></div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-800 truncate">{note.title || '无标题'}</h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {note.content || '暂无内容...'}
                      </p>
                      <div className="flex items-center gap-1 mt-3 text-[10px] text-slate-400 font-medium">
                        <Clock size={10} />
                        {note.updatedAt}
                      </div>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center py-12 bg-white/30 rounded-3xl border border-dashed border-slate-200">
                <FileText className="mx-auto text-slate-300 mb-2" size={32} />
                <p className="text-sm text-slate-400 font-medium">没找到相关笔记</p>
              </div>
            )}
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col overflow-hidden">
          {selectedNote ? (
            <>
              <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                   <div className="flex items-center gap-2">
                    {colors.map(c => (
                      <button 
                        key={c.name}
                        onClick={() => handleColorChange(c.class)}
                        className={`w-4 h-4 rounded-full transition-transform hover:scale-125 ${c.class} ${selectedNote.color === c.class ? 'ring-2 ring-offset-2 ring-slate-300 scale-110' : ''}`}
                      />
                    ))}
                  </div>
                  <input 
                    type="text"
                    value={selectedNote.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="在这里输入标题..."
                    className="flex-1 text-xl font-bold text-slate-800 outline-none bg-transparent"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => onDeleteNote(selectedNote.id)}
                    className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div className="flex-1 p-8">
                <textarea 
                  value={selectedNote.content}
                  onChange={(e) => handleContentChange(e.target.value)}
                  placeholder="写下你的想法、复习总结或者灵感..."
                  className="w-full h-full text-slate-600 leading-relaxed outline-none resize-none bg-transparent placeholder:text-slate-300"
                ></textarea>
              </div>
              <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                   <span className="px-2 py-0.5 bg-white border border-slate-200 rounded-md">自动保存中</span>
                </div>
                <div className="font-medium uppercase tracking-wider">最后修改: {selectedNote.updatedAt}</div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <BookOpen size={48} className="text-slate-200" />
              </div>
              <h3 className="text-xl font-bold text-slate-700">选择或创建一个笔记</h3>
              <p className="mt-2 max-w-xs">点击左侧列表中的笔记开始编辑，或者点击右上角的新建按钮。</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notebook;
