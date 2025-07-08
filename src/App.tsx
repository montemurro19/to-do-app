import HomePage from "./components/pages/HomePage";
import ReportsPage from "./components/pages/ReportsPage";
import MainLayout from "./components/templates/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./context/ThemeContext";
import { TaskProvider } from "./context/TaskContext";
import { SettingsProvider } from "./context/SettingsContext";
import { PomodoroProvider } from "./context/PomodoroContext";
import { AuthProvider } from "./context/AuthContext";
import { RouterProvider, useRouter } from "./context/RouterContext";

function AppContent() {
  const { currentRoute } = useRouter();

  const renderPage = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage />;
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <HomePage />; // Settings é gerenciado pelo modal
      default:
        return <HomePage />;
    }
  };

  return (
    <AuthProvider>
      <ThemeProvider>
        <SettingsProvider>
          <PomodoroProvider>
            <TaskProvider>
              <ProtectedRoute>
                <MainLayout>
                  {renderPage()}
                </MainLayout>
              </ProtectedRoute>
            </TaskProvider>
          </PomodoroProvider>
        </SettingsProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
