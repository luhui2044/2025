
import React, { useState } from 'react';
import { StudyPlan, Task } from '../types';
import { CalendarRange, Trash2, CheckCircle, LayoutGrid, Calendar as CalendarIcon } from 'lucide-react';
import CalendarView from './CalendarView';

interface PlannerProps {
  plans: StudyPlan[];
  tasks: Task[];
  onDeletePlan: (id: string) => void;
  onToggleStep: (planId: string, stepIdx: number) => void;
}

const Planner: React.FC<PlannerProps> = ({ plans, tasks, onDeletePlan, onToggleStep }) => {
  const [view, setView] = useState<'list' | 'calendar'>('list');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 font-accent">我的学习计划</h2>
          <p className="text-sm text-slate-500 mt-1">管理你的学习任务与长期目标</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setView('list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                view === 'list' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <LayoutGrid size={18} />
              列表
            </button>
            <button 
              onClick={() => setView('calendar')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                view === 'calendar' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <CalendarIcon size={18} />
              日历
            </button>
          </div>
          
          <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500 font-medium bg-white px-3 py-2 rounded-xl border border-slate-200">
            <CalendarRange size={16} />
            {plans.length} 个进行中
          </div>
        </div>
      </div>

      {view === 'calendar' ? (
        <CalendarView plans={plans} tasks={tasks} />
      ) : (
        plans.length === 0 ? (
          <div className="bg-white rounded-[2rem] border border-slate-100 p-12 text-center space-y-4">
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto text-indigo-500">
              <CalendarRange size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-700">暂无学习计划</h3>
            <p className="text-slate-500 max-w-sm mx-auto">快去 AI 助教那里创建你的第一个个性化学习路线图吧！</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {plans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col group hover:border-indigo-200 transition-all">
                <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-widest">{plan.subject}</span>
                    <h3 className="text-xl font-bold text-slate-800 mt-1">{plan.goal}</h3>
                  </div>
                  <button 
                    onClick={() => onDeletePlan(plan.id)}
                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="p-6 space-y-4 flex-1">
                  {plan.steps.map((step, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => onToggleStep(plan.id, idx)}
                      className={`group/item flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                        step.completed ? 'bg-emerald-50/50 border-emerald-100' : 'bg-white border-slate-100 hover:border-indigo-200'
                      }`}
                    >
                      <div className={`mt-0.5 w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 transition-colors ${
                        step.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-200 group-hover/item:border-indigo-400'
                      }`}>
                        {step.completed && <CheckCircle size={14} />}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-semibold transition-all ${step.completed ? 'text-emerald-700 line-through opacity-60' : 'text-slate-700'}`}>
                          {step.title}
                        </p>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">{step.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-6 bg-slate-50 mt-auto">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-500 mb-2 uppercase">
                    <span>完成进度</span>
                    <span>{Math.round((plan.steps.filter(s => s.completed).length / plan.steps.length) * 100)}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600 transition-all duration-700 ease-out" 
                      style={{ width: `${(plan.steps.filter(s => s.completed).length / plan.steps.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Planner;
