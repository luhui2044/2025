
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Calendar, BrainCircuit, BarChart3, Bell, BookOpen, Download, Menu, X } from 'lucide-react';
import { AppSection } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeSection, setActiveSection }) => {
  const [canInstall, setCanInstall] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const checkInstall = () => {
      if ((window as any).deferredPrompt) {
        setCanInstall(true);
      }
    };
    window.addEventListener('can-install-pwa', checkInstall);
    checkInstall();
    return () => window.removeEventListener('can-install-pwa', checkInstall);
  }, []);

  const handleInstall = async () => {
    const promptEvent = (window as any).deferredPrompt;
    if (!promptEvent) return;
    promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;
    if (outcome === 'accepted') {
      (window as any).deferredPrompt = null;
      setCanInstall(false);
    }
  };

  const navItems = [
    { id: AppSection.Dashboard, label: '概览', shortLabel: '首页', icon: LayoutDashboard },
    { id: AppSection.Planner, label: '学习计划', shortLabel: '计划', icon: Calendar },
    { id: AppSection.AICoach, label: 'AI 助教', shortLabel: 'AI', icon: BrainCircuit },
    { id: AppSection.Notes, label: '笔记本', shortLabel: '笔记', icon: BookOpen },
    { id: AppSection.Analytics, label: '进度统计', shortLabel: '统计', icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex-col hidden md:flex">
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
        
        <div className="mt-auto p-6 space-y-4 border-t border-slate-100">
          {canInstall && (
            <button 
              onClick={handleInstall}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-colors border border-emerald-100"
            >
              <Download size={16} />
              安装到手机
            </button>
          )}
          <div className="bg-indigo-600 rounded-2xl p-4 text-white">
            <p className="text-xs opacity-80 mb-1">本周坚持</p>
            <p className="text-lg font-bold">🔥 5 天连续!</p>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden bg-white/80 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-slate-100 sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold font-accent">F</div>
          <span className="font-bold text-slate-800 font-accent">FocusFlow</span>
        </div>
        <div className="flex items-center gap-2">
          {canInstall && (
            <button onClick={handleInstall} className="p-2 text-indigo-600 bg-indigo-50 rounded-lg">
              <Download size={18} />
            </button>
          )}
          <button className="p-2 text-slate-400">
            <Bell size={20} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative pb-20 md:pb-0">
        {/* Breadcrumb for Desktop */}
        <div className="hidden md:flex px-8 pt-6 justify-end items-center gap-4">
           <div className="flex items-center gap-3 border-l pl-4 border-slate-200">
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-800">陈小明</p>
                <p className="text-xs text-slate-500">初中二年级</p>
              </div>
              <img src="https://picsum.photos/seed/alex/100/100" alt="Avatar" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
            </div>
        </div>

        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-2 py-2 flex items-center justify-around z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${
              activeSection === item.id 
                ? 'text-indigo-600' 
                : 'text-slate-400'
            }`}
          >
            <item.icon size={20} fill={activeSection === item.id ? "currentColor" : "none"} fillOpacity={0.1} />
            <span className="text-[10px] font-bold">{item.shortLabel}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
