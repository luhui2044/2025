
import React, { useState } from 'react';
import { Sparkles, Wand2, Loader2, BrainCircuit, Check } from 'lucide-react';
import { generateStudyPlan } from '../services/geminiService';

interface AICoachProps {
    onPlanCreated: (plan: any) => void;
}

const AICoach: React.FC<AICoachProps> = ({ onPlanCreated }) => {
  const [goal, setGoal] = useState('');
  const [subject, setSubject] = useState('通用');
  const [days, setDays] = useState(3);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async () => {
    if (!goal) return;
    setLoading(true);
    try {
      const plan = await generateStudyPlan(goal, subject, days);
      setResult(plan);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const subjects = ['数学', '科学', '英语', '语文', '历史', '地理', '艺术', '通用'];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold mb-4">
          <Sparkles size={16} />
          由 Gemini AI 驱动
        </div>
        <h2 className="text-4xl font-extrabold text-slate-800 font-accent">AI 学习教练</h2>
        <p className="text-slate-500 max-w-lg mx-auto">告诉我你在学什么，我将为你制定个性化的通关路线图！</p>
      </header>

      <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-indigo-100/50 border border-slate-100">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">学习目标</label>
              <input 
                type="text" 
                placeholder="例如：掌握二次方程" 
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all placeholder:text-slate-300"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">科目</label>
              <select 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all appearance-none"
              >
                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-slate-700">计划周期: {days} 天</label>
                <span className="text-xs text-indigo-600 font-bold uppercase tracking-widest">{days > 5 ? '深度攻克' : '快速冲刺'}</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="14" 
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading || !goal}
            className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-lg shadow-lg transition-all ${
                loading ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
            }`}
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <Wand2 size={20} />
                生成我的学习计划
              </>
            )}
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-indigo-50/50 border-2 border-indigo-100 rounded-[2.5rem] p-8 space-y-6 animate-in zoom-in-95 duration-500">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-indigo-900 flex items-center gap-2">
              <BrainCircuit className="text-indigo-600" />
              生成的学习路线图
            </h3>
            <button 
                onClick={() => {
                    onPlanCreated({
                        id: Date.now().toString(),
                        goal,
                        subject,
                        deadline: `${days} 天`,
                        steps: result.steps.map((s: any) => ({ ...s, completed: false }))
                    });
                    setResult(null);
                    setGoal('');
                }}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors"
            >
                <Check size={16} />
                保存到计划本
            </button>
          </div>
          
          <div className="space-y-3">
            {result.steps.map((step: any, idx: number) => (
              <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-indigo-100 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex-shrink-0 flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-800">{step.title}</p>
                  <p className="text-xs text-indigo-500 font-bold uppercase mt-1">推荐时长: {step.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AICoach;
