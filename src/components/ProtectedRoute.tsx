import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import LoginPage from "./pages/LoginPage";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--text-primary)' }}></div>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Carregando...</p>
        </div>
      </div>
    );
  }

  // Se não autenticado, mostrar página de login
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Se autenticado, mostrar conteúdo protegido
  return <>{children}</>;
} 