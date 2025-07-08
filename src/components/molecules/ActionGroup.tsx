import { useState } from "react";
import { LogOut } from "lucide-react";
import Button from "../atoms/Button";
import AddTaskModal from "../organisms/AddTaskModal";
import { useTasks } from "../../context/TaskContext";
import { useTranslation } from "../../utils/i18n";
import { useAuth } from "../../context/AuthContext";
import LogoutConfirmModal from "../organisms/LogoutConfirmModal";

export default function ActionGroup() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { addTask } = useTasks();
  const { t } = useTranslation();
  const { logout } = useAuth();

  const handleAddTaskClick = () => {
    setShowAddModal(true);
  };

  const handleAddTask = (task: any) => {
    addTask(task);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  return (
    <>
      <div className="flex flex-row gap-1 sm:gap-2 items-center">
        <Button label={t('tasks.addTask')} onClick={handleAddTaskClick} />
        <Button
          label={t('navigation.logout')}
          onClick={handleLogout}
          icon={<LogOut size={16} />}
          variant="secondary"
        />
      </div>
      
      <AddTaskModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddTask={handleAddTask}
      />
      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={logout}
      />
    </>
  );
}
