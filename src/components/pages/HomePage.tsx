import Divider from "../atoms/Divider";
import PomodoroTimer from "../organisms/PomodoroTimer";
import TaskColumn from "../molecules/TaskColumn";
import { useTasks } from "../../context/TaskContext";
import { useSettings } from "../../context/SettingsContext";
import { usePomodoro } from "../../context/PomodoroContext";
import { useTranslation } from "../../utils/i18n";
import type { Task } from "../../context/TaskContext";

export default function HomePage() {
  const { tasks, moveTask } = useTasks();
  const { settings } = useSettings();
  const { dailyStats, getTodaySessions } = usePomodoro();
  const { t } = useTranslation();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDragStart = (_e: React.DragEvent, task: Task) => {
    console.log("Drag started:", task.title);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newStatus: Task["status"]) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    console.log("Dropping task", taskId, "to", newStatus);
    moveTask(taskId, newStatus);
  };



  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 h-full">
        {settings.pomodoroEnabled && (
          <div className="w-full lg:w-1/4 lg:min-w-80">
            <PomodoroTimer />
            {/* Daily Sprints - Ciclos de Pomodoro do Dia */}
            <h3 className="text-lg font-semibold mt-6 text-center" style={{ color: 'var(--text-primary)' }}>{t('pomodoro.dailySprints')}</h3>
            <Divider />
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{dailyStats.totalPomodoros}</div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t('pomodoro.pomodorosToday')}</div>
              </div>
              <div className="space-y-2">
                {getTodaySessions().length > 0 ? (
                  getTodaySessions().map((session, index) => (
                    <div key={session.id} className="flex justify-between items-center p-2 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                      <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
                        {session.type === 'work' ? `${t('pomodoro.workSession')} ${index + 1}` : 
                         session.type === 'short-break' ? t('pomodoro.shortBreakSession') : t('pomodoro.longBreakSession')}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        {Math.round(session.duration / 60)}min
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {t('pomodoro.noPomodorosToday')}
                    </div>
                    <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                      {t('pomodoro.startWorkSession')}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="flex-1 flex flex-col min-w-0 h-full">
          {/* Conteúdo principal */}
          <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>{t('tasks.title')}</h1>
          
          {/* Colunas de tarefas com scroll horizontal */}
          <div className="overflow-x-auto task-columns-scroll flex-1" style={{ scrollbarWidth: 'thin', scrollbarColor: 'var(--text-secondary) transparent', marginBottom: '10px' }}>
            <div className="flex gap-6 h-full" style={{ minWidth: `${settings.columns.length * 280 + (settings.columns.length - 1) * 24}px` }}>
              {settings.columns
                .sort((a, b) => a.order - b.order)
                .map((column) => {
                  const columnTasks = tasks.filter(task => task.status === column.status);
                  return (
                    <div key={column.id} className="flex-shrink-0 w-70">
                      <TaskColumn
                        title={column.name}
                        status={column.status}
                        tasks={columnTasks}
                        isCompletionColumn={column.isCompletionColumn}
                        onDragStart={handleDragStart}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
