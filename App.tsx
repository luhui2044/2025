
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import AICoach from './components/AICoach';
import Planner from './components/Planner';
import Analytics from './components/Analytics';
import Notebook from './components/Notebook';
import TaskModal from './components/TaskModal';
import { getMotivationalTip } from './services/geminiService';
import { Task, StudyPlan, AppSection, Note } from './types';

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: '复习数学第五章笔记',
    subject: '数学',
    dueDate: new Date().toISOString().split('T')[0],
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
  }
];

const INITIAL_NOTES: Note[] = [
  {
    id: 'n1',
    title: '期末复习重点',
    content: '重点关注文言文虚词用法总结。',
    updatedAt: new Date().toLocaleString('zh-CN'),
    color: 'bg-indigo-500'
  }
];

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.Dashboard);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [plans, setPlans] = useState<StudyPlan[]>([]);
  const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [motivationalTip, setMotivationalTip] = useState('加载中...');

  // Load from local storage
  useEffect(() => {
    const savedPlans = localStorage.getItem('study_plans');
    if (savedPlans) setPlans(JSON.parse(savedPlans));
    
    const savedTasks = localStorage.getItem('study_tasks');
    if (savedTasks) setTasks(JSON.parse(savedTasks));

    const savedNotes = localStorage.getItem('study_notes');
    if (savedNotes) setNotes(JSON.parse(savedNotes));

    // Fetch AI Tip
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
            onDeleteTask={handleDeleteTask}
            onAddTask={() => setIsTaskModalOpen(true)} 
            motivationalTip={motivationalTip}
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
        return <Dashboard tasks={tasks} onToggleTask={handleToggleTask} onDeleteTask={handleDeleteTask} onAddTask={() => setIsTaskModalOpen(true)} motivationalTip={motivationalTip} />;
    }
  };

  return (
    <Layout activeSection={activeSection} setActiveSection={setActiveSection}>
      {renderContent()}
      <TaskModal 
        isOpen={isTaskModalOpen} 
        onClose={() => setIsTaskModalOpen(false)} 
        onAdd={handleAddTask} 
      />
    </Layout>
  );
};

export default App;
