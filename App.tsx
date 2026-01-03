
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import AICoach from './components/AICoach';
import Planner from './components/Planner';
import Analytics from './components/Analytics';
import Notebook from './components/Notebook';
import TaskModal from './components/TaskModal';
import { getMotivationalTip, breakDownTask } from './services/geminiService';
import { Task, StudyPlan, AppSection, Note } from './types';

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: '预习物理电学第一课',
    subject: '物理',
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'high',
    completed: false,
    subtasks: []
  },
  {
    id: '2',
    title: '背诵古诗三首',
    subject: '语文',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    priority: 'medium',
    completed: false,
    subtasks: []
  }
];

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.Dashboard);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [plans, setPlans] = useState<StudyPlan[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [motivationalTip, setMotivationalTip] = useState('加载中...');
  const [isBreakingDown, setIsBreakingDown] = useState<string | null>(null);

  useEffect(() => {
    const savedPlans = localStorage.getItem('study_plans');
    if (savedPlans) setPlans(JSON.parse(savedPlans));
    
    const savedTasks = localStorage.getItem('study_tasks');
    if (savedTasks) setTasks(JSON.parse(savedTasks));

    const savedNotes = localStorage.getItem('study_notes');
    if (savedNotes) setNotes(JSON.parse(savedNotes));

    const fetchTip = async () => {
        try {
            const tip = await getMotivationalTip("已完成2个任务，还有3个待办，连击5天");
            setMotivationalTip(tip);
        } catch (e) {
            setMotivationalTip("每一次努力，都是在为未来的自己投票。");
        }
    };
    fetchTip();
  }, []);

  useEffect(() => {
    localStorage.setItem('study_plans', JSON.stringify(plans));
    localStorage.setItem('study_tasks', JSON.stringify(tasks));
    localStorage.setItem('study_notes', JSON.stringify(notes));
  }, [plans, tasks, notes]);

  const handleToggleTask = (id: string) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleAddTask = (taskData: Omit<Task, 'id' | 'completed' | 'subtasks'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      completed: false,
      subtasks: []
    };
    setTasks([newTask, ...tasks]);
    setIsTaskModalOpen(false);
  };

  const handleBreakdownTask = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    setIsBreakingDown(taskId);
    try {
      const steps = await breakDownTask(task.title);
      setTasks(prev => prev.map(t => 
        t.id === taskId ? { ...t, subtasks: steps } : t
      ));
    } catch (error) {
      console.error("拆解任务失败:", error);
      alert("AI 暂时休息了，请稍后再试");
    } finally {
      setIsBreakingDown(null);
    }
  };

  const handleAddPlan = (newPlan: StudyPlan) => {
    setPlans([newPlan, ...plans]);
    setActiveSection(AppSection.Planner);
  };

  const renderContent = () => {
    switch (activeSection) {
      case AppSection.Dashboard:
        return (
          <Dashboard 
            tasks={tasks} 
            onToggleTask={handleToggleTask} 
            onDeleteTask={handleDeleteTask}
            onAddTask={() => setIsTaskModalOpen(true)}
            onBreakdownTask={handleBreakdownTask}
            motivationalTip={motivationalTip}
            isBreakingDown={isBreakingDown}
          />
        );
      case AppSection.AICoach:
        return <AICoach onPlanCreated={handleAddPlan} />;
      case AppSection.Planner:
        return (
          <Planner 
            plans={plans} 
            tasks={tasks}
            onDeletePlan={(id) => setPlans(prev => prev.filter(p => p.id !== id))} 
            onToggleStep={(planId, idx) => setPlans(prev => prev.map(p => p.id === planId ? { ...p, steps: p.steps.map((s, i) => i === idx ? {...s, completed: !s.completed} : s)} : p))} 
          />
        );
      case AppSection.Notes:
        return (
          <Notebook 
            notes={notes}
            onAddNote={() => setNotes([{id: Date.now().toString(), title: '新笔记', content: '', updatedAt: new Date().toLocaleString(), color: 'bg-indigo-500'}, ...notes])}
            onUpdateNote={(note) => setNotes(prev => prev.map(n => n.id === note.id ? note : n))}
            onDeleteNote={(id) => setNotes(prev => prev.filter(n => n.id !== id))}
          />
        );
      case AppSection.Analytics:
        return <Analytics />;
      default:
        return null;
    }
  };

  return (
    <Layout activeSection={activeSection} setActiveSection={setActiveSection}>
      {renderContent()}
      <TaskModal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} onAdd={handleAddTask} />
    </Layout>
  );
};

export default App;
