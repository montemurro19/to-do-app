import { useRef, useState } from "react";
import Card from "./Card";
import TaskDetailModal from "../organisms/TaskDetailModal";
import { useTasks } from "../../context/TaskContext";
import type { Task } from "../../context/TaskContext";

interface TaskCardProps {
  task: Task;
  isCompletionColumn?: boolean;
  onDragStart: (e: React.DragEvent, task: Task) => void;
}

export default function TaskCard({ task, isCompletionColumn = false, onDragStart }: TaskCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const { updateTask } = useTasks();

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", task.id);
    e.dataTransfer.effectAllowed = "move";
    onDragStart(e, task);
    
    // Adicionar efeito visual durante o drag
    if (cardRef.current) {
      cardRef.current.style.opacity = "0.5";
    }
  };

  const handleDragEnd = () => {
    // Restaurar opacidade
    if (cardRef.current) {
      cardRef.current.style.opacity = "1";
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Não abrir modal se estiver arrastando
    if (e.defaultPrevented) return;
    setShowDetailModal(true);
  };

  // Usar apenas as tags da tarefa (sem tags de status)
  const getTagsForTask = (task: Task): string[] => {
    return task.tags;
  };

  return (
    <>
      <div
        ref={cardRef}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onClick={handleCardClick}
        className="cursor-pointer active:scale-95"
      >
        <Card
          title={task.title}
          description={task.description}
          tags={getTagsForTask(task)}
          isDisabled={isCompletionColumn}
        />
      </div>

      <TaskDetailModal
        task={task}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        onUpdateTask={updateTask}
      />
    </>
  );
} 