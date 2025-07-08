import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface Column {
  id: string;
  name: string;
  status: string;
  order: number;
  isCompletionColumn?: boolean; // Coluna de conclusão - tasks não aparecem no dia seguinte
}

export interface Settings {
  pomodoroEnabled: boolean;
  columns: Column[];
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const defaultSettings: Settings = {
  pomodoroEnabled: true,
  columns: [
    { id: 'todo', name: 'Todo', status: 'todo', order: 0 },
    { id: 'doing', name: 'Doing', status: 'doing', order: 1 },
    { id: 'done', name: 'Done', status: 'done', order: 2 }
  ]
};

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  // Carregar configurações do localStorage na inicialização
  useEffect(() => {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsedSettings });
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  // Salvar configurações no localStorage quando mudarem
  useEffect(() => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (updates: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
} 