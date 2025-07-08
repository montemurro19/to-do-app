import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Button from "../atoms/Button";
import { useTranslation } from "../../utils/i18n";

interface PomodoroConfig {
  workTime: number; // em segundos
  shortBreak: number; // em segundos
  longBreak: number; // em segundos
}

interface PomodoroConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigChange: (config: PomodoroConfig) => void;
}

const STORAGE_KEY = "pomodoro-config";

// Configuração padrão
const DEFAULT_CONFIG: PomodoroConfig = {
  workTime: 25 * 60, // 25 minutos
  shortBreak: 5 * 60, // 5 minutos
  longBreak: 15 * 60, // 15 minutos
};

export default function PomodoroConfigModal({
  isOpen,
  onClose,
  onConfigChange,
}: PomodoroConfigModalProps) {
  const { t } = useTranslation();
  const [config, setConfig] = useState<PomodoroConfig>(DEFAULT_CONFIG);
  const [tempConfig, setTempConfig] = useState<PomodoroConfig>(DEFAULT_CONFIG);

  // Carregar configuração do localStorage
  useEffect(() => {
    const savedConfig = localStorage.getItem(STORAGE_KEY);
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig(parsedConfig);
        setTempConfig(parsedConfig);
      } catch (error) {
        console.error("Erro ao carregar configuração:", error);
      }
    }
  }, []);

  // Salvar configuração
  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tempConfig));
    setConfig(tempConfig);
    onConfigChange(tempConfig);
    onClose();
  };

  // Cancelar alterações
  const handleCancel = () => {
    setTempConfig(config);
    onClose();
  };

  // Resetar para padrão
  const handleReset = () => {
    setTempConfig(DEFAULT_CONFIG);
  };

  // Fechar com ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleCancel();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Fechar clicando no overlay
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal */}
      <div className="relative w-full max-w-md rounded-xl border shadow-2xl" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b" style={{ borderColor: 'var(--border-primary)' }}>
          <h2 className="text-lg sm:text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            {t('pomodoro.settings')}
          </h2>
          <Button
            label=""
            onClick={handleCancel}
            icon={<X size={20} />}
            variant="secondary"
          />
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* Work Time */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              {t('pomodoro.workTime')}
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="60"
                value={Math.floor(tempConfig.workTime / 60)}
                onChange={(e) => 
                  setTempConfig(prev => ({
                    ...prev,
                    workTime: parseInt(e.target.value) * 60
                  }))
                }
                className="flex-1"
               />
               <span className="font-mono text-lg min-w-[3rem]" style={{ color: 'var(--text-primary)' }}>
                 {Math.floor(tempConfig.workTime / 60)}
               </span>
            </div>
          </div>

          {/* Short Break */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              {t('pomodoro.shortBreak')}
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="30"
                value={Math.floor(tempConfig.shortBreak / 60)}
                onChange={(e) => 
                  setTempConfig(prev => ({
                    ...prev,
                    shortBreak: parseInt(e.target.value) * 60
                  }))
                }
                className="flex-1"
               />
               <span className="font-mono text-lg min-w-[3rem]" style={{ color: 'var(--text-primary)' }}>
                 {Math.floor(tempConfig.shortBreak / 60)}
               </span>
            </div>
          </div>

          {/* Long Break */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              {t('pomodoro.longBreak')}
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="5"
                max="60"
                value={Math.floor(tempConfig.longBreak / 60)}
                onChange={(e) => 
                  setTempConfig(prev => ({
                    ...prev,
                    longBreak: parseInt(e.target.value) * 60
                  }))
                }
                className="flex-1"
               />
               <span className="font-mono text-lg min-w-[3rem]" style={{ color: 'var(--text-primary)' }}>
                 {Math.floor(tempConfig.longBreak / 60)}
               </span>
            </div>
          </div>

          {/* Presets */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              {t('pomodoro.quickPresets')}
            </label>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <Button
                  label={t('pomodoro.default')}
                  onClick={() => setTempConfig(DEFAULT_CONFIG)}
                  variant="secondary"
                />
                <Button
                  label={t('pomodoro.focus')}
                  onClick={() => setTempConfig({
                    workTime: 45 * 60,
                    shortBreak: 10 * 60,
                    longBreak: 20 * 60
                  })}
                  variant="secondary"
                />
                <Button
                  label={t('pomodoro.calm')}
                  onClick={() => setTempConfig({
                    workTime: 20 * 60,
                    shortBreak: 8 * 60,
                    longBreak: 12 * 60
                  })}
                  variant="secondary"
                />
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-center mt-1" style={{ color: 'var(--text-secondary)' }}>
                <div>(25 - 5 - 15)</div>
                <div>(45 - 10 - 20)</div>
                <div>(20 - 8 - 12)</div>
              </div>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex gap-3 pt-4 border-t" style={{ borderColor: 'var(--border-primary)' }}>
            <Button
              label={t('common.reset')}
              onClick={handleReset}
              variant="secondary"
            />
            <div className="flex gap-2 ml-auto">
              <Button
                label={t('common.cancel')}
                onClick={handleCancel}
                variant="secondary"
              />
              <Button
                label={t('common.save')}
                onClick={handleSave}
                variant="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 