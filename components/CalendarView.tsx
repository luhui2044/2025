
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { StudyPlan, Task } from '../types';

interface CalendarViewProps {
  plans: StudyPlan[];
  tasks: Task[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ plans, tasks }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const totalDays = daysInMonth(year, month);
  const startOffset = firstDayOfMonth(year, month);

  const monthNames = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
  const dayLabels = ["日", "一", "二", "三", "四", "五", "六"];

  // Helper to get items for a specific date
  const getItemsForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dateTasks = tasks.filter(t => t.dueDate === dateStr);
    // Simplified logic: treat plan goal as a single item on its deadline if date matches
    // Note: Plan deadlines are currently stored loosely, this is an approximation
    return dateTasks;
  };

  const calendarDays = [];
  // Previous month padding
  const prevMonthTotalDays = daysInMonth(year, month - 1);
  for (let i = startOffset - 1; i >= 0; i--) {
    calendarDays.push({ day: prevMonthTotalDays - i, currentMonth: false });
  }
  // Current month days
  for (let i = 1; i <= totalDays; i++) {
    calendarDays.push({ day: i, currentMonth: true });
  }
  // Next month padding
  const remaining = 42 - calendarDays.length;
  for (let i = 1; i <= remaining; i++) {
    calendarDays.push({ day: i, currentMonth: false });
  }

  const today = new Date();
  const isToday = (day: number) => 
    today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden animate-in zoom-in-95 duration-500">
      <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
        <h3 className="text-xl font-bold text-slate-800 font-accent flex items-center gap-4">
          <span className="bg-indigo-600 text-white px-4 py-1.5 rounded-2xl text-lg">
            {year}
          </span>
          {monthNames[month]}
        </h3>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all">
            <ChevronLeft size={20} className="text-slate-600" />
          </button>
          <button onClick={() => setCurrentDate(new Date())} className="px-4 py-2 text-sm font-bold text-indigo-600 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all">
            回到今天
          </button>
          <button onClick={nextMonth} className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all">
            <ChevronRight size={20} className="text-slate-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 border-b border-slate-50">
        {dayLabels.map(label => (
          <div key={label} className="py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50/10">
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 h-[600px]">
        {calendarDays.map((dateObj, idx) => {
          const items = dateObj.currentMonth ? getItemsForDate(dateObj.day) : [];
          const currentIsToday = dateObj.currentMonth && isToday(dateObj.day);

          return (
            <div 
              key={idx} 
              className={`border-r border-b border-slate-50 p-3 transition-colors hover:bg-slate-50/50 group ${
                !dateObj.currentMonth ? 'bg-slate-50/20 opacity-30' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`w-8 h-8 flex items-center justify-center rounded-xl text-sm font-bold ${
                  currentIsToday 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                    : 'text-slate-600'
                }`}>
                  {dateObj.day}
                </span>
              </div>
              
              <div className="space-y-1 overflow-y-auto max-h-[80%] custom-scrollbar">
                {items.map((item) => (
                  <div 
                    key={item.id} 
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold border truncate ${
                      item.completed 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                        : item.priority === 'high' 
                          ? 'bg-rose-50 text-rose-600 border-rose-100' 
                          : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                    }`}
                  >
                    {item.completed && <CheckCircle2 size={8} className="inline mr-1" />}
                    {item.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
