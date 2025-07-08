import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Calendar, BarChart3 } from "lucide-react";
import { useTasks } from "../../context/TaskContext";
import { useSettings } from "../../context/SettingsContext";
import { useTranslation } from "../../utils/i18n";
import Card from "../atoms/Card";

interface CompletedTask {
  id: string;
  title: string;
  description: string;
  tags: string[];
  completedAt: string;
  completedDate: string;
}

export default function ReportsPage() {
  const { tasks } = useTasks();
  const { settings } = useSettings();
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Filtrar tasks concluídas (que estão em colunas de conclusão)
  const completedTasks = useMemo(() => {
    const completionColumns = settings.columns.filter(col => col.isCompletionColumn);
    const completionStatuses = completionColumns.map(col => col.status);
    
    return tasks
      .filter(task => completionStatuses.includes(task.status) && task.completedAt)
      .map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        tags: task.tags,
        completedAt: task.completedAt!,
        completedDate: new Date(task.completedAt!).toDateString()
      }))
      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
  }, [tasks, settings.columns]);

  // Agrupar tasks por data
  const tasksByDate = useMemo(() => {
    const grouped: Record<string, CompletedTask[]> = {};
    
    completedTasks.forEach(task => {
      if (!grouped[task.completedDate]) {
        grouped[task.completedDate] = [];
      }
      grouped[task.completedDate].push(task);
    });
    
    return grouped;
  }, [completedTasks]);

  // Obter datas únicas ordenadas (mais recente primeiro)
  const uniqueDates = useMemo(() => {
    return Object.keys(tasksByDate).sort((a, b) => 
      new Date(b).getTime() - new Date(a).getTime()
    );
  }, [tasksByDate]);

  // Estatísticas gerais
  const stats = useMemo(() => {
    const totalCompleted = completedTasks.length;
    const today = new Date().toDateString();
    const completedToday = completedTasks.filter(task => task.completedDate === today).length;
    const completedThisWeek = completedTasks.filter(task => {
      const taskDate = new Date(task.completedAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return taskDate >= weekAgo;
    }).length;

    return {
      totalCompleted,
      completedToday,
      completedThisWeek
    };
  }, [completedTasks]);

  // Navegar entre datas
  const goToPreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  // Formatar data para exibição
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (dateString === today) {
      return t('reports.today');
    } else if (dateString === yesterday.toDateString()) {
      return t('reports.yesterday');
    } else {
      return date.toLocaleDateString(t('reports.dateLocale'), {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  };

  const selectedDateString = selectedDate.toDateString();
  const tasksForSelectedDate = tasksByDate[selectedDateString] || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
          {t('reports.title')}
        </h1>
        <div className="flex items-center gap-2">
          <BarChart3 size={20} style={{ color: 'var(--text-secondary)' }} />
          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {stats.totalCompleted}
          </span>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border" style={{ 
          backgroundColor: 'var(--bg-secondary)', 
          borderColor: 'var(--border-primary)' 
        }}>
          <div className="text-2xl font-bold text-blue-600">{stats.totalCompleted}</div>
          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {t('reports.totalCompleted')}
          </div>
        </div>
        <div className="p-4 rounded-lg border" style={{ 
          backgroundColor: 'var(--bg-secondary)', 
          borderColor: 'var(--border-primary)' 
        }}>
          <div className="text-2xl font-bold text-green-600">{stats.completedToday}</div>
          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {t('reports.completedToday')}
          </div>
        </div>
        <div className="p-4 rounded-lg border" style={{ 
          backgroundColor: 'var(--bg-secondary)', 
          borderColor: 'var(--border-primary)' 
        }}>
          <div className="text-2xl font-bold text-purple-600">{stats.completedThisWeek}</div>
          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {t('reports.completedThisWeek')}
          </div>
        </div>
      </div>

      {/* Navegação de Data */}
      <div className="flex items-center justify-between p-4 rounded-lg border" style={{ 
        backgroundColor: 'var(--bg-secondary)', 
        borderColor: 'var(--border-primary)' 
      }}>
        <button
          onClick={goToPreviousDay}
          className="p-2 rounded hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="flex items-center gap-3">
          <Calendar size={20} style={{ color: 'var(--text-secondary)' }} />
          <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
            {formatDate(selectedDateString)}
          </span>
          <button
            onClick={goToToday}
            className="px-3 py-1 text-xs rounded border transition-all duration-200 ease-in-out cursor-pointer"
            style={{ 
              color: 'var(--text-primary)',
              borderColor: 'var(--border-primary)',
              backgroundColor: 'var(--bg-primary)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-primary)';
            }}
          >
            {t('reports.today')}
          </button>
        </div>
        
        <button
          onClick={goToNextDay}
          className="p-2 rounded hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Lista de Tasks Concluídas */}
      <div className="space-y-4">
        {tasksForSelectedDate.length > 0 ? (
          <>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              {tasksForSelectedDate.length} {formatDate(selectedDateString)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasksForSelectedDate.map(task => (
                <div key={task.id} className="opacity-60 grayscale">
                  <Card
                    title={task.title}
                    description={task.description}
                    tags={task.tags}
                    isDisabled={true}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <Calendar size={48} className="mx-auto mb-4" style={{ color: 'var(--text-secondary)' }} />
            <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              Nenhuma atividade
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Não há atividades nesta data.
            </p>
          </div>
        )}
      </div>

      {/* Histórico de Datas */}
      {uniqueDates.length > 1 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            {t('reports.history')}
          </h3>
          <div className="space-y-2">
            {uniqueDates.slice(0, 10).map(dateString => (
              <button
                key={dateString}
                onClick={() => setSelectedDate(new Date(dateString))}
                className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ease-in-out cursor-pointer ${
                  dateString === selectedDateString ? 'ring-2 ring-blue-500' : ''
                }`}
                style={{ 
                  backgroundColor: dateString === selectedDateString ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
                  borderColor: 'var(--border-primary)',
                  color: 'var(--text-primary)'
                }}
                onMouseEnter={(e) => {
                  if (dateString !== selectedDateString) {
                    e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (dateString !== selectedDateString) {
                    e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                  }
                }}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{formatDate(dateString)}</span>
                  <span className="text-sm px-2 py-1 rounded-full" style={{ 
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-secondary)'
                  }}>
                    {tasksByDate[dateString].length} {t('reports.tasks')}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 