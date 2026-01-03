
import React from 'react';
import { Plus, CheckCircle2, Clock, Flame, BrainCircuit, Trash2, ChevronRight, Loader2 } from 'lucide-react';
import { Task, Priority } from '../types';

interface DashboardProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onAddTask: () => void;
  onBreakdownTask: (taskId: string) => void;
  motivationalTip: string;
  isBreakingDown: string | null;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  tasks, onToggleTask, onDeleteTask, onAddTask, onBreakdownTask, motivationalTip, isBreakingDown 
}) => {
  const pendingTasks = tasks.filter(t => !t.completed);
  const completedToday = tasks.filter(t => t.completed).length;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 font-accent">你好, 同学! 👋</h2>
          <p className="text-slate-500 mt-1">今天你有 {pendingTasks.length} 个学习任务需要处理。</p>
        </div>
        <button 
          onClick={onAddTask}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-100"
        >
          <Plus size={18} />
          添加任务
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-medium">已完成</p>
            <p className="text-lg font-bold text-slate-800">{completedToday}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
            <Flame size={20} />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-medium">学习连击</p>
            <p className="text-lg font-bold text-slate-800">5天</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 px-1">
            <Clock size={20} className="text-indigo-600" />
            待办清单
          </h3>
          <div className="space-y-3">
            {pendingTasks.length > 0 ? (
              pendingTasks.map((task) => (
                <div key={task.id} className="bg-white group rounded-2xl p-4 border border-slate-100 hover:border-indigo-200 transition-all shadow-sm">
                  <div className="flex items-start gap-3">
                    <button 
                      onClick={() => onToggleTask(task.id)}
                      className="mt-1 w-6 h-6 rounded-lg border-2 border-slate-200 flex items-center justify-center hover:border-indigo-500"
                    >
                      <div className="w-3 h-3 bg-indigo-600 rounded-sm opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-800 truncate">{task.title}</h4>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          task.priority === 'high' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-500'
                        }`}>
                          {task.subject}
                        </span>
                      </div>
                      
                      {task.subtasks && task.subtasks.length > 0 && (
                        <div className="mt-3 space-y-2 pl-2 border-l-2 border-indigo-50">
                          {task.subtasks.map((sub, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-slate-500">
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-300"></div>
                              {sub.title}
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mt-3 flex items-center gap-4">
                        <button 
                          onClick={() => onBreakdownTask(task.id)}
                          disabled={!!isBreakingDown}
                          className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors"
                        >
                          {isBreakingDown === task.id ? (
                            <Loader2 size={12} className="animate-spin" />
                          ) : (
                            <BrainCircuit size={12} />
                          )}
                          AI 拆解步骤
                        </button>
                        <span className="text-[10px] text-slate-400">截止: {task.dueDate}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => onDeleteTask(task.id)}
                      className="p-2 text-slate-300 hover:text-rose-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200">
                <p className="text-slate-400 font-medium">任务都完成了，休息一下吧！☕️</p>
              </div>
            )}
          </div>
        </section>

        <section className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2.5rem] p-6 text-white h-fit shadow-xl shadow-indigo-100">
          <div className="flex items-center gap-2 mb-4">
            <BrainCircuit size={18} className="text-indigo-200" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-100">AI 学习导师</span>
          </div>
          <p className="text-lg font-medium leading-relaxed italic">
            “{motivationalTip}”
          </p>
          <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
            <div className="text-xs text-indigo-200">当前状态: 专注中</div>
            <button className="text-xs font-bold bg-white/20 px-3 py-1.5 rounded-lg hover:bg-white/30 transition-colors">
              获取新建议
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
