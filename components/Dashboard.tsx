
import React from 'react';
import { Plus, CheckCircle2, Clock, Star, Flame, BrainCircuit } from 'lucide-react';
import { Task, Priority } from '../types';

interface DashboardProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onAddTask: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ tasks, onToggleTask, onAddTask }) => {
  const pendingTasks = tasks.filter(t => !t.completed);
  const completedToday = tasks.filter(t => t.completed).length;

  const getPriorityColor = (p: Priority) => {
    switch (p) {
      case 'high': return 'text-rose-600 bg-rose-50';
      case 'medium': return 'text-amber-600 bg-amber-50';
      case 'low': return 'text-emerald-600 bg-emerald-50';
    }
  };

  const getPriorityLabel = (p: Priority) => {
    switch (p) {
      case 'high': return '高';
      case 'medium': return '中';
      case 'low': return '低';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 font-accent">欢迎回来，小明! 👋</h2>
          <p className="text-slate-500 mt-1">今天你有 {pendingTasks.length} 个任务需要关注。</p>
        </div>
        <button 
          onClick={onAddTask}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-indigo-200"
        >
          <Plus size={18} />
          添加新任务
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">今日已完成</p>
            <p className="text-2xl font-bold text-slate-800">{completedToday} 个任务</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600">
            <Flame size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">当前连击</p>
            <p className="text-2xl font-bold text-slate-800">5 天</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Star size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">专注点数</p>
            <p className="text-2xl font-bold text-slate-800">1,250</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Task List */}
        <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Clock size={20} className="text-indigo-600" />
            今日待办
          </h3>
          <div className="space-y-4">
            {pendingTasks.length > 0 ? (
              pendingTasks.map((task) => (
                <div key={task.id} className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <button 
                    onClick={() => onToggleTask(task.id)}
                    className="w-6 h-6 rounded-lg border-2 border-slate-200 flex items-center justify-center hover:border-indigo-500 transition-colors group-hover:bg-white"
                  >
                    <div className="w-3 h-3 bg-indigo-600 rounded-sm opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  </button>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-800">{task.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{task.subject} • 截止时间：{task.dueDate}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getPriorityColor(task.priority)}`}>
                    {getPriorityLabel(task.priority)}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-400 font-medium">今日暂无待办任务！</p>
                <p className="text-xs text-slate-300">可以享受轻松时光或提前规划。</p>
              </div>
            )}
          </div>
        </section>

        {/* Motivational Sidebar */}
        <section className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-indigo-200 text-xs font-bold tracking-widest uppercase">每日激励</span>
              <p className="text-xl font-medium mt-4 leading-relaxed italic">
                “成功的秘诀在于开始。不要让那些你做不到的事阻碍了你能做到的事。”
              </p>
              <div className="mt-6 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <BrainCircuit size={16} />
                </div>
                <span className="text-sm font-semibold">AI 学习教练小贴士</span>
              </div>
            </div>
            {/* Abstract Shapes */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6 text-white border border-slate-800 shadow-xl">
             <h3 className="font-bold mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                近期考试
             </h3>
             <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div>
                        <p className="font-medium">数学：代数小测验</p>
                        <p className="text-xs text-white/50">本周四, 10月24日</p>
                    </div>
                    <div className="text-indigo-400 font-bold text-sm">3 天后</div>
                </div>
                <div className="flex justify-between items-center p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div>
                        <p className="font-medium">科学：细胞单元测试</p>
                        <p className="text-xs text-white/50">下周一, 10月28日</p>
                    </div>
                    <div className="text-indigo-400 font-bold text-sm">7 天后</div>
                </div>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
