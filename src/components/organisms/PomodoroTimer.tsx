import { useState, useEffect, useRef } from "react";
import { Pause, Play, Square, Minimize2, Maximize2, Settings } from "lucide-react";
import Button from "../atoms/Button";
import TimerDisplay from "../atoms/TimerDisplay";
import PomodoroConfigModal from "./PomodoroConfigModal";
import { usePomodoro } from "../../context/PomodoroContext";
import { useSettings } from "../../context/SettingsContext";
import { useTranslation } from "../../utils/i18n";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function PomodoroTimer() {
  const [workTime, setWorkTime] = useState(25 * 60);
  const [shortBreak, setShortBreak] = useState(5 * 60);
  const [longBreak, setLongBreak] = useState(15 * 60);
  const [timeLeft, setTimeLeft] = useState(workTime);
  const [isActive, setIsActive] = useState(false);
  const [minimized, setMinimized] = useState(false); // Começa maximizado
  const [showControls, setShowControls] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [currentSessionType, setCurrentSessionType] = useState<'work' | 'short-break' | 'long-break'>('work');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasShownNotification = useRef(false);
  const { startSession, completeSession } = usePomodoro();
  const { settings } = useSettings();
  const { t } = useTranslation();

  // Atualizar título da página baseado no estado do timer
  usePageTitle({
    pomodoroActive: isActive,
    timeLeft: timeLeft,
    defaultTitle: t('tasks.title'),
    sessionType: currentSessionType
  });

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && isActive && !hasShownNotification.current) {
      setIsActive(false);
      hasShownNotification.current = true;
      // Completar sessão no contexto
      completeSession();
      // Notificação mais elegante
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(t('pomodoro.title'), {
          body: t('pomodoro.complete'),
          icon: '/favicon.ico'
        });
      } else {
        alert(t('pomodoro.complete'));
      }
    }
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isActive, timeLeft, completeSession, t]);

  // Maximizar quando o pomodoro for habilitado
  useEffect(() => {
    if (settings.pomodoroEnabled) {
      setMinimized(false);
    }
  }, [settings.pomodoroEnabled]);

  function start() {
    if (timeLeft > 0) {
      setIsActive(true);
      hasShownNotification.current = false;
      // Iniciar sessão no contexto
      startSession(currentSessionType, timeLeft);
    }
  }

  function pause() {
    setIsActive(false);
  }

  function reset() {
    setIsActive(false);
    setTimeLeft(workTime);
    hasShownNotification.current = false;
  }

  const handleConfigChange = (config: { workTime: number; shortBreak: number; longBreak: number }) => {
    setWorkTime(config.workTime);
    setShortBreak(config.shortBreak);
    setLongBreak(config.longBreak);
    setTimeLeft(config.workTime);
    setIsActive(false);
  };

  const handleMouseEnter = () => setShowControls(true);
  const handleMouseLeave = () => minimized && setShowControls(false);

  return (
    <div
      className="relative w-full max-w-xs mx-auto rounded-xl border p-4 sm:p-6 text-center transition-all duration-300"
      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Botão de minimizar no canto superior esquerdo */}
      {!minimized && (
        <div className="absolute top-2 left-2">
          <Button
            label=""
            onClick={() => setMinimized(true)}
            icon={<Minimize2 />}
            variant="secondary"
          />
        </div>
      )}

      {/* Botão de configurações no canto superior direito */}
      {!minimized && (
        <div className="absolute top-2 right-2">
          <Button
            label=""
            onClick={() => setShowConfigModal(true)}
            icon={<Settings />}
            variant="secondary"
          />
        </div>
      )}

      {/* Timer */}
      {!minimized || !showControls ? (
        <div className={!minimized ? "pt-4" : ""}>
          <TimerDisplay time={timeLeft} minimized={minimized} />
        </div>
      ) : null}

      {(showControls || !minimized) && (
        <div
          className={`${
            minimized
              ? "flex flex-wrap justify-center gap-2 items-center"
              : "flex flex-col items-center gap-4 mt-0"
          }`}
        >
          {/* Expandir — lado esquerdo na linha minimizada */}
          {minimized && (
            <Button
              label=""
              onClick={() => setMinimized(false)}
              icon={<Maximize2 />}
              variant="secondary"
            />
          )}

          {/* Play / Pause / Reset */}
          <div
            className={`flex ${minimized ? "gap-2" : "justify-center gap-4"}`}
          >
            {!isActive ? (
              <Button
                label=""
                onClick={start}
                icon={<Play />}
                variant="secondary"
              />
            ) : (
              <Button
                label=""
                onClick={pause}
                icon={<Pause />}
                variant="secondary"
              />
            )}
            <Button
              label=""
              onClick={reset}
              icon={<Square />}
              variant="secondary"
            />
          </div>

          {/* Timer type buttons — apenas no modo expandido */}
          {!minimized && (
            <div className="flex justify-center gap-4">
              <Button
                label={t('pomodoro.workButton')}
                onClick={() => {
                  setTimeLeft(workTime);
                  setCurrentSessionType('work');
                  hasShownNotification.current = false;
                }}
                variant="secondary"
              />
              <Button
                label={t('pomodoro.shortBreakButton')}
                onClick={() => {
                  setTimeLeft(shortBreak);
                  setCurrentSessionType('short-break');
                  hasShownNotification.current = false;
                }}
                variant="secondary"
              />
              <Button
                label={t('pomodoro.longBreakButton')}
                onClick={() => {
                  setTimeLeft(longBreak);
                  setCurrentSessionType('long-break');
                  hasShownNotification.current = false;
                }}
                variant="secondary"
              />
            </div>
          )}
        </div>
      )}

      {/* Modal de Configurações */}
      <PomodoroConfigModal
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        onConfigChange={handleConfigChange}
      />
    </div>
  );
}
