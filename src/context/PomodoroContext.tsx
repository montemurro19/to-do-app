import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface PomodoroSession {
  id: string;
  type: 'work' | 'short-break' | 'long-break';
  duration: number; // em segundos
  startTime: Date;
  endTime: Date;
  completed: boolean;
}

export interface DailyStats {
  date: string; // YYYY-MM-DD
  totalPomodoros: number;
  totalWorkTime: number; // em segundos
  totalBreakTime: number; // em segundos
  sessions: PomodoroSession[];
}

interface PomodoroContextType {
  currentSession: PomodoroSession | null;
  dailyStats: DailyStats;
  startSession: (type: 'work' | 'short-break' | 'long-break', duration: number) => void;
  completeSession: () => void;
  getTodaySessions: () => PomodoroSession[];
  getTodayStats: () => DailyStats;
}

const PomodoroContext = createContext<PomodoroContextType | undefined>(undefined);

export function PomodoroProvider({ children }: { children: ReactNode }) {
  const [currentSession, setCurrentSession] = useState<PomodoroSession | null>(null);
  const [dailyStats, setDailyStats] = useState<DailyStats>({
    date: new Date().toISOString().split('T')[0],
    totalPomodoros: 0,
    totalWorkTime: 0,
    totalBreakTime: 0,
    sessions: []
  });

  // Carregar dados do localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem('pomodoroStats');
    if (savedStats) {
      try {
        const parsedStats = JSON.parse(savedStats);
        const today = new Date().toISOString().split('T')[0];
        
        if (parsedStats.date === today) {
          setDailyStats(parsedStats);
        } else {
          // Novo dia, resetar estatísticas
          setDailyStats({
            date: today,
            totalPomodoros: 0,
            totalWorkTime: 0,
            totalBreakTime: 0,
            sessions: []
          });
        }
      } catch (error) {
        console.error('Error loading pomodoro stats:', error);
      }
    }
  }, []);

  // Salvar dados no localStorage quando mudarem
  useEffect(() => {
    localStorage.setItem('pomodoroStats', JSON.stringify(dailyStats));
  }, [dailyStats]);

  const startSession = (type: 'work' | 'short-break' | 'long-break', duration: number) => {
    const session: PomodoroSession = {
      id: Date.now().toString(),
      type,
      duration,
      startTime: new Date(),
      endTime: new Date(),
      completed: false
    };
    setCurrentSession(session);
  };

  const completeSession = () => {
    if (currentSession) {
      const completedSession: PomodoroSession = {
        ...currentSession,
        endTime: new Date(),
        completed: true
      };

      setDailyStats(prev => {
        const newSessions = [...prev.sessions, completedSession];
        const totalWorkTime = newSessions
          .filter(s => s.type === 'work' && s.completed)
          .reduce((sum, s) => sum + s.duration, 0);
        const totalBreakTime = newSessions
          .filter(s => (s.type === 'short-break' || s.type === 'long-break') && s.completed)
          .reduce((sum, s) => sum + s.duration, 0);
        const totalPomodoros = newSessions.filter(s => s.type === 'work' && s.completed).length;

        return {
          ...prev,
          totalPomodoros,
          totalWorkTime,
          totalBreakTime,
          sessions: newSessions
        };
      });

      setCurrentSession(null);
    }
  };

  const getTodaySessions = (): PomodoroSession[] => {
    return dailyStats.sessions.filter(session => session.completed);
  };

  const getTodayStats = (): DailyStats => {
    return dailyStats;
  };

  return (
    <PomodoroContext.Provider value={{
      currentSession,
      dailyStats,
      startSession,
      completeSession,
      getTodaySessions,
      getTodayStats
    }}>
      {children}
    </PomodoroContext.Provider>
  );
}

export function usePomodoro() {
  const context = useContext(PomodoroContext);
  if (context === undefined) {
    throw new Error("usePomodoro must be used within a PomodoroProvider");
  }
  return context;
} 