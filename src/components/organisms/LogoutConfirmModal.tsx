import { X } from "lucide-react";
import { useTranslation } from "../../utils/i18n";
import Button from "../atoms/Button";

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

function LogoutConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message
}: LogoutConfirmModalProps) {
  const { t } = useTranslation();

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  // Fechar com ESC
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleCancel();
    }
  };

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
      onKeyDown={handleKeyDown}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      {/* Modal */}
      <div className="relative w-full max-w-md rounded-xl border shadow-2xl" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b" style={{ borderColor: 'var(--border-primary)' }}>
          <h2 className="text-lg sm:text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            {title || t('navigation.logout')}
          </h2>
          <Button
            label=""
            onClick={handleCancel}
            icon={<X size={20} />}
            variant="secondary"
          />
        </div>
        {/* Content */}
        <div className="p-4 sm:p-6">
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {message || t('messages.confirmLogout')}
          </p>
        </div>
        {/* Botões de ação */}
        <div className="flex gap-3 p-4 sm:p-6 pt-0 border-t" style={{ borderColor: 'var(--border-primary)' }}>
          <Button
            label={t('common.cancel')}
            onClick={handleCancel}
            variant="secondary"
          />
          <button
            onClick={handleConfirm}
            className="px-3 sm:px-4 py-2 flex items-center justify-center gap-1 sm:gap-2 font-medium transition-all duration-200 ease-in-out text-sm sm:text-base cursor-pointer h-10 rounded-full hover:scale-105 bg-red-600 text-white hover:bg-red-700"
          >
            {t('navigation.logout')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutConfirmModal; 