
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import AICoach from './components/AICoach';
import Planner from './components/Planner';
import Analytics from './components/Analytics';
import Notebook from './components/Notebook';
import { Task, StudyPlan, AppSection, Note } from './types';

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: '复习数学第五章笔记',
    subject: '数学',
    dueDate: new Date().toISOString().split('T')[0], // Normalize to YYYY-MM-DD
    priority: 'high',
    completed: false,
    subtasks: []
  },
  {
    id: '2',
    title: '写英语作文大纲',
    subject: '英语',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    priority: 'medium',
    completed: false,
    subtasks: []
  },
  {
    id: '3',
    title: '阅读生物科普文章',
    subject: '科学',
    dueDate: '2025-10-25',
    priority: 'low',
    completed: true,
    subtasks: []
  }
];

const INITIAL_NOTES: Note[] = [
  {
    id: 'n1',
    title: '期末复习重点 - 语文',
    content: '1. 古诗词默写：重点关注《出师表》\n2. 文言文虚词：之、其、而的用法总结\n3. 作文素材：关于成长的名言警句...',
    updatedAt: new Date().toLocaleString('zh-CN'),
    color: 'bg-indigo-500'
  },
  {
    id: 'n2',
    title: '物理公式整理',
    content: '速度：v = s/t\n重力：G = mg\n压强：p = F/S\n这些公式在下一单元考试会考到。',
    updatedAt: new Date().toLocaleString('zh-CN'),
    color: 'bg-amber-400'
  }
];

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.Dashboard);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [plans, setPlans] = useState<StudyPlan[]>([]);
  const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);

  // Load from local storage
  useEffect(() => {
    const savedPlans = localStorage.getItem('study_plans');
    if (savedPlans) setPlans(JSON.parse(savedPlans));
    
    const savedTasks = localStorage.getItem('study_tasks');
    if (savedTasks) setTasks(JSON.parse(savedTasks));

    const savedNotes = localStorage.getItem('study_notes');
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, []);

  // Save to storage on change
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

  const handleAddTask = () => {
    const newTitle = prompt('任务内容是什么？');
    if (!newTitle) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTitle,
      subject: '通用',
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'medium',
      completed: false,
      subtasks: []
    };
    setTasks([newTask, ...tasks]);
  };

  const handleAddPlan = (newPlan: StudyPlan) => {
    setPlans([newPlan, ...plans]);
    setActiveSection(AppSection.Planner);
  };

  const handleDeletePlan = (id: string) => {
    if (confirm('确定要删除这个计划吗？')) {
      setPlans(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleToggleStep = (planId: string, stepIdx: number) => {
    setPlans(prev => prev.map(p => {
      if (p.id === planId) {
        const newSteps = [...p.steps];
        newSteps[stepIdx] = { ...newSteps[stepIdx], completed: !newSteps[stepIdx].completed };
        return { ...p, steps: newSteps };
      }
      return p;
    }));
  };

  // Note Handlers
  const handleAddNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: '新笔记',
      content: '',
      updatedAt: new Date().toLocaleString('zh-CN'),
      color: 'bg-indigo-500'
    };
    setNotes([newNote, ...notes]);
  };

  const handleUpdateNote = (updatedNote: Note) => {
    setNotes(prev => prev.map(n => n.id === updatedNote.id ? updatedNote : n));
  };

  const handleDeleteNote = (id: string) => {
    if (confirm('确定要删除这条笔记吗？')) {
      setNotes(prev => prev.filter(n => n.id !== id));
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case AppSection.Dashboard:
        return (
          <Dashboard 
            tasks={tasks} 
            onToggleTask={handleToggleTask} 
            onAddTask={handleAddTask} 
          />
        );
      case AppSection.AICoach:
        return <AICoach onPlanCreated={handleAddPlan} />;
      case AppSection.Planner:
        return (
          <Planner 
            plans={plans} 
            tasks={tasks}
            onDeletePlan={handleDeletePlan} 
            onToggleStep={handleToggleStep} 
          />
        );
      case AppSection.Notes:
        return (
          <Notebook 
            notes={notes}
            onAddNote={handleAddNote}
            onUpdateNote={handleUpdateNote}
            onDeleteNote={handleDeleteNote}
          />
        );
      case AppSection.Analytics:
        return <Analytics />;
      default:
        return <Dashboard tasks={tasks} onToggleTask={handleToggleTask} onAddTask={handleAddTask} />;
    }
  };

  return (
    <Layout activeSection={activeSection} setActiveSection={setActiveSection}>
      {renderContent()}
    </Layout>
  );
};

export default App;
