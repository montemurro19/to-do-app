import { useState, useEffect } from "react";
import Button from "../atoms/Button";
import { X, Tag, ChevronDown } from "lucide-react";
import { getTagColor } from "../../utils/tagColors";
import { useTasks } from "../../context/TaskContext";
import { useSettings } from "../../context/SettingsContext";
import { useTranslation } from "../../utils/i18n";
import type { Task } from "../../context/TaskContext";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: Omit<Task, "id">) => void;
}

export default function AddTaskModal({ isOpen, onClose, onAddTask }: AddTaskModalProps) {
  const { tasks } = useTasks();
  const { settings } = useSettings();
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<string>(settings.columns[0]?.status || "todo");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      description: description.trim(),
      status,
      tags
    });

    // Reset form
    setTitle("");
    setDescription("");
    setStatus(settings.columns[0]?.status || "todo");
    setTags([]);
    setTagInput("");
    setShowStatusDropdown(false);
    setShowTagDropdown(false);
    onClose();
  };

  // Obter todas as tags existentes de todas as tarefas
  const getAllTags = (): string[] => {
    const allTags = new Set<string>();
    tasks.forEach(task => {
      task.tags.forEach(tag => allTags.add(tag));
    });
    return Array.from(allTags).sort();
  };

  // Filtrar tags baseado no input
  const getFilteredTags = (): string[] => {
    const allTags = getAllTags();
    if (!tagInput.trim()) {
      return allTags.filter(tag => !tags.includes(tag));
    }
    
    return allTags
      .filter(tag => !tags.includes(tag))
      .filter(tag => tag.toLowerCase().includes(tagInput.toLowerCase()));
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
      setShowTagDropdown(false);
    }
  };

  const selectExistingTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
      setShowTagDropdown(false);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className="w-full max-w-md rounded-lg p-6"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            {t('modals.addTask')}
          </h2>
          <Button
            label=""
            onClick={onClose}
            icon={<X />}
            variant="secondary"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              {t('tasks.taskTitle')} *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border text-sm"
              style={{ 
                backgroundColor: 'var(--bg-secondary)', 
                borderColor: 'var(--border-primary)',
                color: 'var(--text-primary)'
              }}
              placeholder={t('tasks.taskTitle')}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              {t('tasks.taskDescription')}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border text-sm resize-none"
              style={{ 
                backgroundColor: 'var(--bg-secondary)', 
                borderColor: 'var(--border-primary)',
                color: 'var(--text-primary)'
              }}
              placeholder={t('tasks.taskDescription')}
              rows={3}
            />
          </div>

          {/* Status */}
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
                <span>{settings.columns.find(col => col.status === status)?.name || t('tasks.taskStatus')}</span>
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
                          setStatus(column.status);
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

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              {t('tasks.taskTags')}
            </label>
            <div className="relative tag-dropdown-container">
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={() => setShowTagDropdown(true)}
                  className="flex-1 px-4 py-3 rounded-lg border text-sm"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    borderColor: 'var(--border-primary)',
                    color: 'var(--text-primary)'
                  }}
                  placeholder={t('tasks.addTag')}
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
            
            {/* Tags display */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                                 {tags.map((tag, index) => (
                   <span
                     key={index}
                     className="px-3 py-1 text-xs font-medium rounded-full text-white flex items-center gap-1"
                     style={{ backgroundColor: getTagColor(tag) }}
                   >
                     <Tag size={12} />
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
                         <X size={10} />
                       </button>
                   </span>
                 ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-3 py-2 rounded hover:scale-105 font-medium transition-all duration-200 ease-in-out cursor-pointer"
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
              onClick={() => handleSubmit({} as React.FormEvent)}
              className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 hover:scale-105 font-medium transition-all duration-200 ease-in-out cursor-pointer"
            >
              {t('tasks.addTask')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 