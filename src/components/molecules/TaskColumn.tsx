import { useState } from "react";
import type { Task } from "../../context/TaskContext";
import TaskCard from "../atoms/TaskCard";
import { useTranslation } from "../../utils/i18n";

interface TaskColumnProps {
  title: string;
  status: string;
  tasks: Task[];
  isCompletionColumn?: boolean;
  onDragStart: (e: React.DragEvent, task: Task) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, status: string) => void;
}

export default function TaskColumn({ 
  title, 
  status, 
  tasks, 
  isCompletionColumn = false,
  onDragStart, 
  onDragOver, 
  onDrop 
}: TaskColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const { t } = useTranslation();

  // Filtrar tasks de colunas de conclusão baseado na data
  const filteredTasks = isCompletionColumn ? tasks.filter(task => {
    // Se a task tem data de conclusão, verificar se é de hoje
    if (task.completedAt) {
      const taskDate = new Date(task.completedAt).toDateString();
      const today = new Date().toDateString();
      return taskDate === today;
    }
    // Se não tem data de conclusão, mostrar (tasks antigas)
    return true;
  }) : tasks;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
    onDragOver(e);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    // Só remove o drag over se o mouse realmente saiu da coluna
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    onDrop(e, status);
  };

  return (
    <div className="flex flex-col h-full relative">
      <h2 className="text-xl font-semibold pb-2 border-b mb-4" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-primary)' }}>
        {title}
      </h2>
      
      <div 
        className={`flex-1 space-y-3 p-2 rounded-lg transition-all duration-200 ${
          isDragOver ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-dashed border-blue-300 dark:border-blue-600' : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {filteredTasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            isCompletionColumn={isCompletionColumn}
            onDragStart={onDragStart}
          />
        ))}
        {filteredTasks.length === 0 && (
          <div className="text-center py-8 text-sm" style={{ color: 'var(--text-secondary)' }}>
            {isCompletionColumn ? 'Nenhuma atividade hoje' : t('tasks.noTasksInColumn')}
          </div>
        )}
      </div>
    </div>
  );
} 