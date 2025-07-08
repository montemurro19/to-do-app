import { useEffect } from 'react';
import { useTranslation } from '../utils/i18n';

interface UsePageTitleOptions {
  pomodoroActive?: boolean;
  timeLeft?: number;
  defaultTitle?: string;
  sessionType?: 'work' | 'short-break' | 'long-break';
}

export function usePageTitle({ 
  pomodoroActive = false, 
  timeLeft = 0, 
  defaultTitle,
  sessionType = 'work'
}: UsePageTitleOptions = {}) {
  const { t } = useTranslation();

  useEffect(() => {
    let title: string;

    if (pomodoroActive && timeLeft > 0) {
      // Formatar tempo restante como MM:SS
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      
      // Adicionar tipo de sessão ao título
      let sessionLabel = '';
      switch (sessionType) {
        case 'work':
          sessionLabel = t('pomodoro.workSession');
          break;
        case 'short-break':
          sessionLabel = t('pomodoro.shortBreakSession');
          break;
        case 'long-break':
          sessionLabel = t('pomodoro.longBreakSession');
          break;
      }
      
      title = `${timeString} - ${sessionLabel}`;
    } else {
      // Título padrão baseado no idioma
      title = defaultTitle || t('tasks.title');
    }

    document.title = title;
  }, [pomodoroActive, timeLeft, defaultTitle, sessionType, t]);
} 