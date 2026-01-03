
import React, { useState } from 'react';
import { X, Calendar, Book, Flag } from 'lucide-react';
import { Priority } from '../types';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (task: { title: string; subject: string; dueDate: string; priority: Priority }) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('通用');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [priority, setPriority] = useState<Priority>('medium');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    onAdd({ title, subject, dueDate, priority });
    setTitle('');
  };

  const subjects = ['数学', '科学', '英语', '语文', '物理', '化学', '生物', '通用'];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300 p-0 sm:p-4">
      <div 
        className="bg-white w-full max-w-lg rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 shadow-2xl animate-in slide-in-from-bottom-10 duration-500 relative"
      >
        <button onClick={onClose} className="absolute right-6 top-6 p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
          <X size={24} />
        </button>
        
        <h3 className="text-2xl font-bold text-slate-800 mb-6 font-accent">添加新任务</h3>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">任务名称</label>
            <input 
              autoFocus
              type="text" 
              placeholder="例如：准备数学周考"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:ring-4 focus:ring-indigo-100 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">科目</label>
              <div className="relative">
                <Book className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <select 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-2xl border border-slate-100 appearance-none outline-none"
                >
                  {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">优先级</label>
              <div className="relative">
                <Flag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <select 
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Priority)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-2xl border border-slate-100 appearance-none outline-none"
                >
                  <option value="low">低</option>
                  <option value="medium">中</option>
                  <option value="high">高</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">截止日期</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="date" 
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-2xl border border-slate-100 outline-none"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-100 active:scale-[0.98] transition-all mt-4"
          >
            确认添加
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
