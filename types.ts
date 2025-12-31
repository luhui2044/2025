
export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  priority: Priority;
  completed: boolean;
  subject: string;
  subtasks: SubTask[];
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface StudyPlan {
  id: string;
  goal: string;
  deadline: string;
  steps: { title: string; duration: string; completed: boolean }[];
  subject: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  color: string;
}

export enum AppSection {
  Dashboard = 'dashboard',
  Planner = 'planner',
  AICoach = 'aicoach',
  Analytics = 'analytics',
  Notes = 'notes'
}
