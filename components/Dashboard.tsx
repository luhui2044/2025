
import React from 'react';
import { Plus, CheckCircle2, Clock, Star, Flame, BrainCircuit, Trash2 } from 'lucide-react';
import { Task, Priority } from '../types';

interface DashboardProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onAddTask: () => void;
  motivationalTip: string;
}

const Dashboard: React.FC<DashboardProps> = ({ tasks, onToggleTask, onDeleteTask, onAddTask, motivationalTip }) => {
  const pendingTasks = tasks.filter(t => !t.completed);
  const completedToday = tasks.filter(t => t.completed).length;

  const getPriorityColor = (p: Priority) => {
    switch (p) {
      case 'high': return 'text-rose-600 bg-rose-50';
      case 'medium': return 'text-amber-600 bg-amber-50';
      case 'low': return 'text-emerald-600 bg-emerald-50';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 font-accent">你好, 小明! 👋</h2>
          <p className="text-slate-500 mt-1">今天你有 {pendingTasks.length} 个任务。</p>
        </div>
        <button 
          onClick={onAddTask}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-100"
        >
          <Plus size={18} />
          新任务
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
        <div className="bg-white p-4 md:p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <p className="text-[10px] md:text-sm text-slate-500 font-medium">已完成</p>
            <p className="text-lg md:text-2xl font-bold text-slate-800">{completedToday}</p>
          </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
            <Flame size={20} />
          </div>
          <div>
            <p className="text-[10px] md:text-sm text-slate-500 font-medium">连击</p>
            <p className="text-lg md:text-2xl font-bold text-slate-800">5天</p>
          </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-3 md:gap-4 hidden md:flex">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Star size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">专注点</p>
            <p className="text-2xl font-bold text-slate-800">1,250</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-4 md:p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Clock size={20} className="text-indigo-600" />
            今日待办
          </h3>
          <div className="space-y-3">
            {pendingTasks.length > 0 ? (
              pendingTasks.map((task) => (
                <div key={task.id} className="group flex items-center gap-3 p-3 md:p-4 rounded-2xl hover:bg-slate-50 border border-slate-50 transition-all">
                  <button 
                    onClick={() => onToggleTask(task.id)}
                    className="w-6 h-6 rounded-lg border-2 border-slate-200 flex items-center justify-center hover:border-indigo-500"
                  >
                    <div className="w-3 h-3 bg-indigo-600 rounded-sm opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  </button>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-800 truncate">{task.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{task.subject} • {task.dueDate}</p>
                  </div>
                  <button 
                    onClick={() => onDeleteTask(task.id)}
                    className="p-2 text-slate-300 hover:text-rose-500 md:opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-400 font-medium">任务都做完啦！🌟</p>
              </div>
            )}
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl shadow-indigo-100">
            <div className="relative z-10">
              <span className="text-indigo-200 text-[10px] font-bold tracking-widest uppercase">AI 每日寄语</span>
              <p className="text-lg font-medium mt-3 leading-relaxed italic">
                “{motivationalTip}”
              </p>
              <div className="mt-4 flex items-center gap-2">
                <BrainCircuit size={16} className="text-indigo-300" />
                <span className="text-xs font-semibold text-indigo-100">AI 学习教练</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
