import { ChartNoAxesColumn, House, Settings } from "lucide-react";
import Button from "../atoms/Button";
import { useState } from "react";
import SettingsModal from "../organisms/SettingsModal";
import { useTranslation } from "../../utils/i18n";
import { useRouter } from "../../context/RouterContext";

export default function NavGroup() {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const { t } = useTranslation();
  const { currentRoute, navigate } = useRouter();

  const handleHomeClick = () => {
    navigate('home');
  };

  const handleReportsClick = () => {
    navigate('reports');
  };

  const handleSettingsClick = () => {
    setShowSettingsModal(true);
  };

  return (
    <>
      <div className="flex flex-row gap-2 items-center">
        <Button
          label={t('navigation.home')}
          onClick={handleHomeClick}
          icon={<House />}
          variant="secondary"
          selected={currentRoute === 'home'}
        />
        <Button
          label={t('navigation.reports')}
          onClick={handleReportsClick}
          icon={<ChartNoAxesColumn />}
          variant="secondary"
          selected={currentRoute === 'reports'}
        />
        <Button
          label={t('navigation.settings')}
          onClick={handleSettingsClick}
          icon={<Settings />}
          variant="secondary"
          selected={false}
        />
      </div>
      
      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />
    </>
  );
}
