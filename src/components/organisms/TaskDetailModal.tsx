import { useState, useEffect } from "react";
import { X, Edit, X as CloseIcon, ChevronDown, Trash2 } from "lucide-react";
import { getTagColor } from "../../utils/tagColors";
import { useTasks } from "../../context/TaskContext";
import { useSettings } from "../../context/SettingsContext";
import { useTranslation } from "../../utils/i18n";
import Button from "../atoms/Button";
import DeleteConfirmModal from "./DeleteConfirmModal";
import type { Task } from "../../context/TaskContext";

interface TaskDetailModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
}

export default function TaskDetailModal({ task, isOpen, onClose, onUpdateTask }: TaskDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { tasks, removeTask } = useTasks();
  const { settings } = useSettings();
  const { t } = useTranslation();

  // Inicializar dados editáveis quando o modal abre
  useEffect(() => {
    if (task && isOpen) {
      setEditedTask({ ...task });
    }
  }, [task, isOpen]);

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.tag-dropdown-container')) {
        setShowTagDropdown(false);
      }
      if (!target.closest('.status-dropdown-container')) {
        setShowStatusDropdown(false);
      }
    };

    if (showTagDropdown || showStatusDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTagDropdown, showStatusDropdown]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTask(task ? { ...task } : null);
  };

  const handleSave = () => {
    if (editedTask && task) {
      onUpdateTask(task.id, {
        title: editedTask.title,
        description: editedTask.description,
        status: editedTask.status,
        tags: editedTask.tags
      });
    }
    setIsEditing(false);
    setShowStatusDropdown(false);
    setShowTagDropdown(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTask(task ? { ...task } : null);
    setShowStatusDropdown(false);
    setShowTagDropdown(false);
  };

  // Obter todas as tags existentes de todas as tarefas
  const getAllTags = (): string[] => {
    const allTags = new Set<string>();
    tasks.forEach(task => {
      task.tags.forEach(tag => allTags.add(tag));
    });
    return Array.from(allTags).sort();
  };

  const addTag = (tagInput: string) => {
    if (tagInput.trim() && editedTask && !editedTask.tags.includes(tagInput.trim())) {
      setEditedTask({
        ...editedTask,
        tags: [...editedTask.tags, tagInput.trim()]
      });
      setTagInput("");
      setShowTagDropdown(false);
    }
  };

  const selectExistingTag = (tag: string) => {
    addTag(tag);
  };

  // Filtrar tags baseado no input
  const getFilteredTags = (): string[] => {
    const allTags = getAllTags();
    if (!tagInput.trim()) {
      return allTags.filter(tag => !currentTask?.tags.includes(tag));
    }
    
    return allTags
      .filter(tag => !currentTask?.tags.includes(tag))
      .filter(tag => tag.toLowerCase().includes(tagInput.toLowerCase()));
  };

  const removeTag = (tagToRemove: string) => {
    if (editedTask) {
      setEditedTask({
        ...editedTask,
        tags: editedTask.tags.filter(tag => tag !== tagToRemove)
      });
    }
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (task) {
      removeTask(task.id);
      onClose();
    }
  };

  if (!isOpen || !task) return null;

  const currentTask = isEditing ? editedTask : task;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className="w-full max-w-2xl rounded-lg"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b" style={{ borderColor: 'var(--border-primary)' }}>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              {isEditing ? t('modals.editTask') : t('tasks.title')}
            </h2>
            {!isEditing && (
              <span 
                className="px-2 py-1 text-xs font-medium rounded-full"
                style={{ 
                  backgroundColor: '#3b82f6',
                  color: 'white'
                }}
              >
                {settings.columns.find(col => col.status === task.status)?.name || task.status}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {!isEditing && (
              <>
                <Button
                  label=""
                  onClick={handleEdit}
                  icon={<Edit size={16} />}
                  variant="secondary"
                />
                <button
                  onClick={handleDelete}
                  className="px-3 sm:px-4 py-2 flex items-center justify-center gap-1 sm:gap-2 font-medium transition-all duration-200 ease-in-out text-sm sm:text-base cursor-pointer h-10 rounded hover:scale-105"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    color: '#ef4444',
                    borderColor: 'var(--border-primary)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                    e.currentTarget.style.color = '#dc2626';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                    e.currentTarget.style.color = '#ef4444';
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </>
            )}
            <Button
              label=""
              onClick={onClose}
              icon={<X size={16} />}
              variant="secondary"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              {t('tasks.taskTitle')}
            </label>
            {isEditing ? (
              <input
                type="text"
                value={currentTask?.title || ''}
                onChange={(e) => setEditedTask(prev => prev ? { ...prev, title: e.target.value } : null)}
                className="w-full px-4 py-3 rounded-lg border text-sm"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  borderColor: 'var(--border-primary)',
                  color: 'var(--text-primary)'
                }}
              />
            ) : (
              <h3 className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
                {task.title}
              </h3>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              {t('tasks.taskDescription')}
            </label>
            {isEditing ? (
              <textarea
                value={currentTask?.description || ''}
                onChange={(e) => setEditedTask(prev => prev ? { ...prev, description: e.target.value } : null)}
                className="w-full px-4 py-3 rounded-lg border text-sm resize-none"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  borderColor: 'var(--border-primary)',
                  color: 'var(--text-primary)'
                }}
                rows={4}
              />
            ) : (
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {task.description || t('tasks.noDescription')}
              </p>
            )}
          </div>

          {/* Status */}
          {isEditing && (
            <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              {t('tasks.taskStatus')}
            </label>
              <div className="relative status-dropdown-container">
                <button
                  type="button"
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className="w-full px-4 py-3 rounded-lg border text-sm flex items-center justify-between"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    borderColor: 'var(--border-primary)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <span>{settings.columns.find(col => col.status === currentTask?.status)?.name || t('tasks.taskStatus')}</span>
                  <ChevronDown size={16} />
                </button>
                
                {/* Dropdown de status */}
                {showStatusDropdown && (
                  <div 
                    className="absolute top-full left-0 right-0 mt-1 max-h-40 overflow-y-auto rounded-lg border z-10"
                    style={{ 
                      backgroundColor: 'var(--bg-secondary)', 
                      borderColor: 'var(--border-primary)'
                    }}
                  >
                    {settings.columns
                      .sort((a, b) => a.order - b.order)
                      .map((column) => (
                        <button
                          key={column.id}
                          type="button"
                          onClick={() => {
                            setEditedTask(prev => prev ? { ...prev, status: column.status } : null);
                            setShowStatusDropdown(false);
                          }}
                          className="w-full px-3 py-2 text-left text-sm transition-colors"
                          style={{ color: 'var(--text-primary)' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          {column.name}
                        </button>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              {t('tasks.taskTags')}
            </label>
            {isEditing ? (
              <div className="space-y-3">
                <div className="relative tag-dropdown-container">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add new tag and press Enter"
                      className="flex-1 px-4 py-3 rounded-lg border text-sm"
                      style={{ 
                        backgroundColor: 'var(--bg-secondary)', 
                        borderColor: 'var(--border-primary)',
                        color: 'var(--text-primary)'
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag(tagInput);
                        }
                      }}
                      onFocus={() => setShowTagDropdown(true)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowTagDropdown(!showTagDropdown)}
                      className="px-4 rounded-lg border flex items-center"
                      style={{ 
                        backgroundColor: 'var(--bg-secondary)', 
                        borderColor: 'var(--border-primary)',
                        color: 'var(--text-primary)'
                      }}
                    >
                      <ChevronDown size={16} />
                    </button>
                  </div>
                  
                  {/* Dropdown de tags existentes */}
                  {showTagDropdown && (
                    <div 
                      className="absolute top-full left-0 right-0 mt-1 max-h-40 overflow-y-auto rounded-lg border z-10"
                      style={{ 
                        backgroundColor: 'var(--bg-secondary)', 
                        borderColor: 'var(--border-primary)'
                      }}
                    >
                      {getFilteredTags().map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => selectExistingTag(tag)}
                          className="w-full px-3 py-2 text-left text-sm transition-colors flex items-center gap-2"
                          style={{ color: 'var(--text-primary)' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: getTagColor(tag) }}
                          />
                          {tag}
                        </button>
                      ))}
                      {getFilteredTags().length === 0 && (
                        <div className="px-3 py-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                          {tagInput.trim() ? t('tasks.noMatchingTags') : t('tasks.noExistingTags')}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                                 <div className="flex flex-wrap gap-2">
                   {currentTask?.tags.map((tag, index) => (
                     <span
                       key={index}
                       className="px-3 py-1 text-xs font-medium rounded-full text-white flex items-center gap-1"
                       style={{ backgroundColor: getTagColor(tag) }}
                     >
                       {tag}
                                                <button
                           type="button"
                           onClick={() => removeTag(tag)}
                           className="ml-1 rounded-full p-0.5"
                           onMouseEnter={(e) => {
                             e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                           }}
                           onMouseLeave={(e) => {
                             e.currentTarget.style.backgroundColor = 'transparent';
                           }}
                         >
                           <CloseIcon size={10} />
                         </button>
                     </span>
                   ))}
                 </div>
              </div>
            ) : (
                             <div className="flex flex-wrap gap-2">
                 {task.tags.map((tag, index) => (
                   <span
                     key={index}
                     className="px-3 py-1 text-xs font-medium rounded-full text-white"
                     style={{ backgroundColor: getTagColor(tag) }}
                   >
                     {tag}
                   </span>
                 ))}
                {task.tags.length === 0 && (
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {t('tasks.noTags')}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        {isEditing && (
          <div className="flex gap-3 p-6 border-t" style={{ borderColor: 'var(--border-primary)' }}>
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2 rounded-lg hover:scale-105 font-medium transition-all duration-200 ease-in-out cursor-pointer"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                borderColor: 'var(--border-primary)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
              }}
            >
              {t('common.cancel')}
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:scale-105 font-medium transition-all duration-200 ease-in-out cursor-pointer"
            >
              {t('common.save')}
            </button>
          </div>
        )}
      </div>

      {/* Modal de confirmação de exclusão */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title={t('tasks.deleteTask')}
        message={t('messages.confirmDeleteTask')}
      />
    </div>
  );
} 