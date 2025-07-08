import { useState } from "react";
import { GripVertical, Trash2, Plus, X, CheckCircle } from "lucide-react";
import type { Column } from "../../context/SettingsContext";
import { useTranslation } from "../../utils/i18n";

interface ColumnManagerProps {
  columns: Column[];
  onUpdateColumns: (columns: Column[]) => void;
}

export default function ColumnManager({ columns, onUpdateColumns }: ColumnManagerProps) {
  const [newColumnName, setNewColumnName] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [draggedColumn, setDraggedColumn] = useState<Column | null>(null);
  const { t } = useTranslation();

  const addColumn = () => {
    if (newColumnName.trim()) {
      const newColumn: Column = {
        id: `column-${Date.now()}`,
        name: newColumnName.trim(),
        status: newColumnName.trim().toLowerCase().replace(/\s+/g, '-'),
        order: columns.length
      };
      
      onUpdateColumns([...columns, newColumn]);
      setNewColumnName("");
      setShowAddForm(false);
    }
  };

  const deleteColumn = (columnId: string) => {
    if (columns.length > 1) {
      const updatedColumns = columns
        .filter(col => col.id !== columnId)
        .map((col, index) => ({ ...col, order: index }));
      onUpdateColumns(updatedColumns);
    }
  };

  const updateColumnName = (columnId: string, newName: string) => {
    const updatedColumns = columns.map(col => 
      col.id === columnId 
        ? { ...col, name: newName, status: newName.toLowerCase().replace(/\s+/g, '-') }
        : col
    );
    onUpdateColumns(updatedColumns);
  };

  const toggleCompletionColumn = (columnId: string) => {
    const updatedColumns = columns.map(col => 
      col.id === columnId 
        ? { ...col, isCompletionColumn: !col.isCompletionColumn }
        : col
    );
    onUpdateColumns(updatedColumns);
  };

  const handleDragStart = (e: React.DragEvent, column: Column) => {
    setDraggedColumn(column);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetColumn: Column) => {
    e.preventDefault();
    if (draggedColumn && draggedColumn.id !== targetColumn.id) {
      const draggedIndex = columns.findIndex(col => col.id === draggedColumn.id);
      const targetIndex = columns.findIndex(col => col.id === targetColumn.id);
      
      const newColumns = [...columns];
      const [removed] = newColumns.splice(draggedIndex, 1);
      newColumns.splice(targetIndex, 0, removed);
      
      // Atualizar ordem
      const reorderedColumns = newColumns.map((col, index) => ({
        ...col,
        order: index
      }));
      
      onUpdateColumns(reorderedColumns);
    }
    setDraggedColumn(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addColumn();
    } else if (e.key === "Escape") {
      setShowAddForm(false);
      setNewColumnName("");
    }
  };

  return (
    <div className="space-y-4">
      {/* Legenda */}
      <div className="p-3 rounded-lg border" style={{ 
        backgroundColor: 'var(--bg-tertiary)', 
        borderColor: 'var(--border-primary)' 
      }}>
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle size={16} style={{ color: '#22c55e' }} />
          <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
            {t('settings.completionColumnLegend')}
          </span>
        </div>
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          {t('settings.completionColumnDescription')}
        </p>
      </div>

      {/* Lista de colunas */}
      <div className="space-y-2">
        {columns.map((column) => (
          <div
            key={column.id}
            draggable
            onDragStart={(e) => handleDragStart(e, column)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column)}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
              draggedColumn?.id === column.id ? 'opacity-50' : ''
            }`}
            style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              borderColor: 'var(--border-primary)'
            }}
          >
            {/* Handle de drag */}
            <div className="cursor-move" style={{ color: 'var(--text-secondary)' }}>
              <GripVertical size={16} />
            </div>
            
            {/* Nome da coluna */}
            <input
              type="text"
              value={column.name}
              onChange={(e) => updateColumnName(column.id, e.target.value)}
              className="flex-1 bg-transparent text-sm font-medium"
              style={{ color: 'var(--text-primary)' }}
              placeholder={t('settings.columnName')}
            />
            
            {/* Botão de conclusão */}
            <button
              onClick={() => toggleCompletionColumn(column.id)}
              className={`p-1 rounded transition-all duration-200 ease-in-out cursor-pointer hover:scale-110 ${
                column.isCompletionColumn ? 'opacity-100' : 'opacity-50'
              }`}
              style={{ 
                color: column.isCompletionColumn ? '#22c55e' : 'var(--text-secondary)',
                backgroundColor: column.isCompletionColumn ? 'rgba(34, 197, 94, 0.1)' : 'transparent'
              }}
              onMouseEnter={(e) => {
                if (!column.isCompletionColumn) {
                  e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!column.isCompletionColumn) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
              title={column.isCompletionColumn ? t('settings.completionColumnEnabled') : t('settings.completionColumnDisabled')}
            >
              <CheckCircle size={14} />
            </button>
            
            {/* Botão de excluir */}
            <button
              onClick={() => deleteColumn(column.id)}
              disabled={columns.length <= 1}
              className="p-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ color: columns.length <= 1 ? 'var(--text-secondary)' : '#ef4444' }}
              onMouseEnter={(e) => {
                if (columns.length > 1) {
                  e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Adicionar nova coluna */}
      {showAddForm ? (
        <div className="flex items-center gap-2 p-3 rounded-lg border" style={{ 
          backgroundColor: 'var(--bg-secondary)', 
          borderColor: 'var(--border-primary)'
        }}>
          <input
            type="text"
            value={newColumnName}
            onChange={(e) => setNewColumnName(e.target.value)}
            onKeyPress={handleKeyPress}
                          className="flex-1 bg-transparent text-sm"
              style={{ color: 'var(--text-primary)' }}
            placeholder={t('settings.columnName')}
            autoFocus
          />
          <button
            onClick={addColumn}
            disabled={!newColumnName.trim()}
            className="p-1 rounded hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer disabled:opacity-50"
            style={{ color: newColumnName.trim() ? '#22c55e' : 'var(--text-secondary)' }}
            onMouseEnter={(e) => {
              if (newColumnName.trim()) {
                e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Plus size={14} />
          </button>
          <button
            onClick={() => {
              setShowAddForm(false);
              setNewColumnName("");
            }}
            className="p-1 rounded hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer"
            style={{ 
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)' 
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
            }}
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full p-3 rounded-lg border border-dashed flex items-center justify-center gap-2 text-sm transition-all duration-200 ease-in-out cursor-pointer hover:scale-105"
          style={{ 
            backgroundColor: 'var(--bg-tertiary)',
            borderColor: 'var(--border-secondary)',
            color: 'var(--text-secondary)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
          }}
        >
          <Plus size={16} />
          {t('settings.addColumn')}
        </button>
      )}
    </div>
  );
} 