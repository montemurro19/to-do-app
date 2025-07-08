import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useSettings } from "./SettingsContext";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string; // Agora é dinâmico baseado nas colunas
  tags: string[];
  completedAt?: string; // Data de conclusão (ISO string)
}

interface TaskContextType {
  tasks: Task[];
  moveTask: (taskId: string, newStatus: string) => void;
  addTask: (task: Omit<Task, "id">) => void;
  removeTask: (taskId: string) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const TASKS_STORAGE_KEY = 'app-tasks';

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { settings } = useSettings();

  // Carregar tarefas do localStorage
  useEffect(() => {
    const saved = localStorage.getItem(TASKS_STORAGE_KEY);
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  // Salvar tarefas no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Omit<Task, "id">) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString()
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const moveTask = (taskId: string, newStatus: string) => {
    updateTask(taskId, { status: newStatus });
  };

  const removeTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  // Wrapper para moveTask que marca completedAt quando mover para coluna de conclusão
  const handleMoveTask = (taskId: string, newStatus: string) => {
    const targetColumn = settings.columns.find((col: any) => col.status === newStatus);
    
    if (targetColumn?.isCompletionColumn) {
      // Se está movendo para coluna de conclusão, marcar data de conclusão
      updateTask(taskId, { 
        status: newStatus, 
        completedAt: new Date().toISOString() 
      });
    } else {
      // Movimento normal
      moveTask(taskId, newStatus);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, moveTask: handleMoveTask, addTask, removeTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
} 