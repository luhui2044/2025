
import React from 'react';
import { LayoutDashboard, Calendar, BrainCircuit, BarChart3, Bell, BookOpen } from 'lucide-react';
import { AppSection } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeSection, setActiveSection }) => {
  const navItems = [
    { id: AppSection.Dashboard, label: '仪表盘', icon: LayoutDashboard },
    { id: AppSection.Planner, label: '学习计划', icon: Calendar },
    { id: AppSection.AICoach, label: 'AI 助教', icon: BrainCircuit },
    { id: AppSection.Notes, label: '笔记本', icon: BookOpen },
    { id: AppSection.Analytics, label: '进度统计', icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8 cursor-pointer" onClick={() => setActiveSection(AppSection.Dashboard)}>
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl font-accent">F</div>
            <h1 className="text-xl font-bold text-slate-800 font-accent tracking-tight">FocusFlow</h1>
          </div>
          
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeSection === item.id 
                    ? 'bg-indigo-50 text-indigo-700' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-slate-100">
          <div className="bg-indigo-600 rounded-2xl p-4 text-white">
            <p className="text-xs opacity-80 mb-1">本周坚持天数</p>
            <p className="text-lg font-bold">🔥 5 天连续!</p>
            <div className="mt-2 h-1.5 w-full bg-indigo-400 rounded-full overflow-hidden">
              <div className="h-full bg-white w-5/7"></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <header className="sticky top-0 z-10 bg-slate-50/80 backdrop-blur-md px-8 py-4 flex items-center justify-between border-b border-slate-200/50 md:border-b-0">
           <div className="md:hidden flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold font-accent">F</div>
          </div>
          <div className="flex-1"></div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 border-l pl-4 ml-2 border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-800">陈小明</p>
                <p className="text-xs text-slate-500">初中二年级</p>
              </div>
              <img 
                src="https://picsum.photos/seed/alex/100/100" 
                alt="Avatar" 
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
              />
            </div>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto h-[calc(100vh-80px)]">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
