
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Trophy, Target, TrendingUp } from 'lucide-react';

const Analytics: React.FC = () => {
  const weeklyData = [
    { name: '周一', tasks: 4 },
    { name: '周二', tasks: 7 },
    { name: '周三', tasks: 5 },
    { name: '周四', tasks: 8 },
    { name: '周五', tasks: 6 },
    { name: '周六', tasks: 3 },
    { name: '周日', tasks: 2 },
  ];

  const subjectData = [
    { name: '数学', value: 40, color: '#6366f1' },
    { name: '科学', value: 30, color: '#f59e0b' },
    { name: '英语', value: 20, color: '#10b981' },
    { name: '其他', value: 10, color: '#64748b' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h2 className="text-3xl font-bold text-slate-800 font-accent">学习进度统计</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-lg shadow-indigo-100">
          <Trophy className="mb-4 opacity-50" size={32} />
          <p className="text-indigo-100 text-sm font-medium">月度目标</p>
          <p className="text-3xl font-bold mt-1">已达成 85%</p>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
          <Target className="mb-4 text-orange-500" size={32} />
          <p className="text-slate-500 text-sm font-medium">学习时长</p>
          <p className="text-3xl font-bold mt-1 text-slate-800">24.5 小时</p>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
          <TrendingUp className="mb-4 text-emerald-500" size={32} />
          <p className="text-slate-500 text-sm font-medium">任务准确率</p>
          <p className="text-3xl font-bold mt-1 text-slate-800">92%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-8">每周任务完成量</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  formatter={(value) => [value, '完成任务']}
                />
                <Bar dataKey="tasks" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-8">学科时间分配</h3>
          <div className="flex-1 flex flex-col md:flex-row items-center gap-8">
            <div className="h-48 w-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subjectData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {subjectData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3 w-full">
              {subjectData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></div>
                    <span className="text-sm font-medium text-slate-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-800">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
