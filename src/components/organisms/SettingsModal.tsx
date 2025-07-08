import { X, Settings, Clock, Clipboard, Globe } from "lucide-react";
import { useSettings } from "../../context/SettingsContext";
import ColumnManager from "../molecules/ColumnManager";
import Button from "../atoms/Button";
import LanguageSelector from "../atoms/LanguageSelector";
import { useTranslation } from "../../utils/i18n";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { settings, updateSettings } = useSettings();
  const { t } = useTranslation();

  const handlePomodoroToggle = () => {
    updateSettings({ pomodoroEnabled: !settings.pomodoroEnabled });
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div 
        className="w-full max-w-md max-h-[90vh] rounded-lg flex flex-col shadow-xl"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b flex-shrink-0" style={{ borderColor: 'var(--border-primary)' }}>
          <div className="flex items-center gap-3">
            <Settings size={20} style={{ color: 'var(--text-primary)' }} />
            <h2 className="text-lg sm:text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              {t('settings.title')}
            </h2>
          </div>
          <Button
            label=""
            onClick={onClose}
            icon={<X size={16} />}
            variant="secondary"
          />
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 min-h-0 overscroll-contain scroll-smooth">
          {/* Pomodoro Settings */}
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock size={18} style={{ color: 'var(--text-primary)' }} />
                <div>
                  <h3 className="font-medium text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>
                    {t('pomodoro.title')}
                  </h3>
                  <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {settings.pomodoroEnabled ? t('settings.pomodoroEnabled') : t('settings.pomodoroDisabled')}
                  </p>
                </div>
              </div>
              <button
                onClick={handlePomodoroToggle}
                className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0"
                style={{ 
                  backgroundColor: settings.pomodoroEnabled ? '#3b82f6' : '#6b7280'
                }}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.pomodoroEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Column Management */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Clipboard size={16} className="text-blue-600" />
              </div>
              <div className="min-w-0">
                <h3 className="font-medium text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>
                  {t('settings.columns')}
                </h3>
                <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {t('settings.dragToReorder')}
                </p>
              </div>
            </div>
            
            <ColumnManager
              columns={settings.columns}
              onUpdateColumns={(newColumns) => updateSettings({ columns: newColumns })}
            />
          </div>

          {/* Language Settings */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Globe size={18} style={{ color: 'var(--text-primary)' }} />
              <div className="min-w-0">
                <h3 className="font-medium text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>
                  {t('settings.language')}
                </h3>
                <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {t('settings.languageDescription')}
                </p>
              </div>
            </div>
            
            <LanguageSelector />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-4 sm:p-6 border-t flex-shrink-0" style={{ borderColor: 'var(--border-primary)' }}>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:scale-105 font-medium transition-all duration-200 ease-in-out cursor-pointer text-sm sm:text-base"
          >
            {t('common.save')}
          </button>
        </div>
      </div>
    </div>
  );
} 