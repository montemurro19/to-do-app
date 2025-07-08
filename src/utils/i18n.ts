// Sistema de Internacionalização (i18n)

export type Language = 'pt-BR' | 'en-US' | 'es-ES';

export interface Translation {
  // Geral
  common: {
    save: string;
    cancel: string;
    reset: string;
    close: string;
    loading: string;
    error: string;
    retry: string;
  };

  // Navegação
  navigation: {
    home: string;
    reports: string;
    settings: string;
    logout: string;
  };

  // Relatórios
  reports: {
    title: string;
    totalCompleted: string;
    completedToday: string;
    completedThisWeek: string;
    today: string;
    yesterday: string;

    history: string;
    tasks: string;
    dateLocale: string;
  };

  // Tarefas
  tasks: {
    title: string;
    addTask: string;
    editTask: string;
    deleteTask: string;
    taskTitle: string;
    taskDescription: string;
    taskStatus: string;
    taskTags: string;
    addTag: string;
    removeTag: string;
    moveTask: string;
    noTasks: string;
    noTasksInColumn: string;
    noMatchingTags: string;
    noExistingTags: string;
    noDescription: string;
    noTags: string;
  };

  // Status das tarefas
  status: {
    todo: string;
    doing: string;
    done: string;
  };

  // Pomodoro
  pomodoro: {
    title: string;
    settings: string;
    workTime: string;
    shortBreak: string;
    longBreak: string;
    start: string;
    pause: string;
    reset: string;
    complete: string;
    workSession: string;
    shortBreakSession: string;
    longBreakSession: string;
    dailySprints: string;
    pomodorosToday: string;
    noPomodorosToday: string;
    startWorkSession: string;
    seeProgressHere: string;
    quickPresets: string;
    default: string;
    focus: string;
    calm: string;
    workButton: string;
    shortBreakButton: string;
    longBreakButton: string;
  };

  // Configurações
  settings: {
    title: string;
    pomodoroEnabled: string;
    pomodoroDisabled: string;
    columns: string;
    addColumn: string;
    deleteColumn: string;
    columnName: string;
    dragToReorder: string;
    completionColumnEnabled: string;
    completionColumnDisabled: string;
    completionColumnLegend: string;
    completionColumnDescription: string;
    language: string;
    languageDescription: string;
    theme: string;
    lightMode: string;
    darkMode: string;
  };

  // Modais
  modals: {
    addTask: string;
    editTask: string;
    pomodoroSettings: string;
    settings: string;
  };

  // Autenticação
  auth: {
    welcome: string;
    loginToContinue: string;
    email: string;
    password: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    login: string;
    loggingIn: string;
    fillAllFields: string;
    invalidCredentials: string;
    loginError: string;
    demoCredentials: string;
  };

  // Mensagens
  messages: {
    taskAdded: string;
    taskUpdated: string;
    taskDeleted: string;
    taskMoved: string;
    settingsSaved: string;
    pomodoroConfigSaved: string;
    columnAdded: string;
    columnDeleted: string;
    columnRenamed: string;
    confirmDeleteTask: string;
    confirmLogout: string;
  };
}

// Traduções
const translations: Record<Language, Translation> = {
  'pt-BR': {
    common: {
      save: 'Salvar',
      cancel: 'Cancelar',
      reset: 'Resetar',
      close: 'Fechar',
      loading: 'Carregando...',
      error: 'Erro',
      retry: 'Tentar novamente'
    },
    navigation: {
      home: 'Início',
      reports: 'Relatórios',
      settings: 'Configurações',
      logout: 'Sair'
    },
    reports: {
      title: 'Relatórios',
  
      totalCompleted: 'Total Concluídas',
      completedToday: 'Concluídas Hoje',
      completedThisWeek: 'Concluídas Esta Semana',
      today: 'Hoje',
      yesterday: 'Ontem',
      history: 'Histórico',
      tasks: 'tarefas',
      dateLocale: 'pt-BR'
    },
    tasks: {
      title: 'Tarefas',
      addTask: 'Adicionar Tarefa',
      editTask: 'Editar Tarefa',
      deleteTask: 'Excluir Tarefa',
      taskTitle: 'Título da Tarefa',
      taskDescription: 'Descrição',
      taskStatus: 'Status',
      taskTags: 'Tags',
      addTag: 'Adicionar Tag',
      removeTag: 'Remover Tag',
      moveTask: 'Mover Tarefa',
      noTasks: 'Nenhuma tarefa encontrada',
      noTasksInColumn: 'Nenhuma tarefa nesta coluna',
      noMatchingTags: 'Nenhuma tag encontrada',
      noExistingTags: 'Nenhuma tag existente',
      noDescription: 'Nenhuma descrição fornecida',
      noTags: 'Nenhuma tag'
    },
    status: {
      todo: 'A Fazer',
      doing: 'Em Andamento',
      done: 'Concluído'
    },
    pomodoro: {
      title: 'Pomodoro',
      settings: 'Configurações do Pomodoro',
      workTime: 'Tempo de Trabalho (minutos)',
      shortBreak: 'Pausa Curta (minutos)',
      longBreak: 'Pausa Longa (minutos)',
      start: 'Iniciar',
      pause: 'Pausar',
      reset: 'Resetar',
      complete: 'Completar',
      workSession: 'Sessão de Trabalho',
      shortBreakSession: 'Pausa Curta',
      longBreakSession: 'Pausa Longa',
      dailySprints: 'Sprints Diários',
      pomodorosToday: 'Pomodoros Hoje',
      noPomodorosToday: 'Nenhum pomodoro completado hoje',
      startWorkSession: 'Inicie uma sessão de trabalho para ver seu progresso aqui',
      seeProgressHere: 'Inicie uma sessão de trabalho para ver seu progresso aqui',
      quickPresets: 'Presets Rápidos',
      default: 'Padrão',
      focus: 'Foco',
      calm: 'Calmo',
      workButton: 'Trabalho',
      shortBreakButton: 'Curta',
      longBreakButton: 'Longa'
    },
    settings: {
      title: 'Configurações',
      pomodoroEnabled: 'Pomodoro Habilitado',
      pomodoroDisabled: 'Pomodoro Desabilitado',
      columns: 'Colunas',
      addColumn: 'Adicionar Coluna',
      deleteColumn: 'Excluir Coluna',
      columnName: 'Nome da Coluna',
      dragToReorder: 'Arraste para reordenar',
      completionColumnEnabled: 'Coluna de conclusão ativada',
      completionColumnDisabled: 'Marcar como coluna de conclusão',
      completionColumnLegend: 'Coluna de Conclusão',
      completionColumnDescription: 'Tasks nesta coluna não aparecem no dia seguinte e ficam com aparência de concluídas.',
      language: 'Idioma',
      languageDescription: 'Escolha seu idioma preferido',
      theme: 'Tema',
      lightMode: 'Modo Claro',
      darkMode: 'Modo Escuro'
    },
    auth: {
      welcome: 'Bem-vindo de volta!',
      loginToContinue: 'Faça login para continuar',
      email: 'E-mail',
      password: 'Senha',
      emailPlaceholder: 'Digite seu e-mail',
      passwordPlaceholder: 'Digite sua senha',
      login: 'Entrar',
      loggingIn: 'Entrando...',
      fillAllFields: 'Por favor, preencha todos os campos',
      invalidCredentials: 'E-mail ou senha incorretos',
      loginError: 'Erro ao fazer login. Tente novamente.',
      demoCredentials: 'Credenciais de Demonstração'
    },
    modals: {
      addTask: 'Adicionar Nova Tarefa',
      editTask: 'Editar Tarefa',
      pomodoroSettings: 'Configurações do Pomodoro',
      settings: 'Configurações'
    },
    messages: {
      taskAdded: 'Tarefa adicionada com sucesso!',
      taskUpdated: 'Tarefa atualizada com sucesso!',
      taskDeleted: 'Tarefa excluída com sucesso!',
      taskMoved: 'Tarefa movida com sucesso!',
      settingsSaved: 'Configurações salvas com sucesso!',
      pomodoroConfigSaved: 'Configuração do Pomodoro salva!',
      columnAdded: 'Coluna adicionada com sucesso!',
      columnDeleted: 'Coluna excluída com sucesso!',
      columnRenamed: 'Coluna renomeada com sucesso!',
      confirmDeleteTask: 'Tem certeza que deseja excluir esta tarefa?',
      confirmLogout: 'Tem certeza que deseja sair?'
    }
  },
  'en-US': {
    common: {
      save: 'Save',
      cancel: 'Cancel',
      reset: 'Reset',
      close: 'Close',
      loading: 'Loading...',
      error: 'Error',
      retry: 'Retry'
    },
    navigation: {
      home: 'Home',
      reports: 'Reports',
      settings: 'Settings',
      logout: 'Logout'
    },
    reports: {
      title: 'Reports',
      totalCompleted: 'Total Completed',
      completedToday: 'Completed Today',
      completedThisWeek: 'Completed This Week',
      today: 'Today',
      yesterday: 'Yesterday',
      history: 'History',
      tasks: 'tasks',
      dateLocale: 'en-US'
    },
    tasks: {
      title: 'Tasks',
      addTask: 'Add Task',
      editTask: 'Edit Task',
      deleteTask: 'Delete Task',
      taskTitle: 'Task Title',
      taskDescription: 'Description',
      taskStatus: 'Status',
      taskTags: 'Tags',
      addTag: 'Add Tag',
      removeTag: 'Remove Tag',
      moveTask: 'Move Task',
      noTasks: 'No tasks found',
      noTasksInColumn: 'No tasks in this column',
      noMatchingTags: 'No matching tags',
      noExistingTags: 'No existing tags',
      noDescription: 'No description provided',
      noTags: 'No tags'
    },
    status: {
      todo: 'Todo',
      doing: 'Doing',
      done: 'Done'
    },
    pomodoro: {
      title: 'Pomodoro',
      settings: 'Pomodoro Settings',
      workTime: 'Work Time (minutes)',
      shortBreak: 'Short Break (minutes)',
      longBreak: 'Long Break (minutes)',
      start: 'Start',
      pause: 'Pause',
      reset: 'Reset',
      complete: 'Complete',
      workSession: 'Work Session',
      shortBreakSession: 'Short Break',
      longBreakSession: 'Long Break',
      dailySprints: 'Daily Sprints',
      pomodorosToday: 'Pomodoros Today',
      noPomodorosToday: 'No pomodoros completed today',
      startWorkSession: 'Start a work session to see your progress here',
      seeProgressHere: 'Start a work session to see your progress here',
      quickPresets: 'Quick Presets',
      default: 'Default',
      focus: 'Focus',
      calm: 'Calm',
      workButton: 'Work',
      shortBreakButton: 'Short',
      longBreakButton: 'Long'
    },
    settings: {
      title: 'Settings',
      pomodoroEnabled: 'Pomodoro Enabled',
      pomodoroDisabled: 'Pomodoro Disabled',
      columns: 'Columns',
      addColumn: 'Add Column',
      deleteColumn: 'Delete Column',
      columnName: 'Column Name',
      dragToReorder: 'Drag to reorder',
      completionColumnEnabled: 'Completion column enabled',
      completionColumnDisabled: 'Mark as completion column',
      completionColumnLegend: 'Completion Column',
      completionColumnDescription: 'Tasks in this column won\'t appear the next day and will look completed.',
      language: 'Language',
      languageDescription: 'Choose your preferred language',
      theme: 'Theme',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode'
    },
    auth: {
      welcome: 'Welcome back!',
      loginToContinue: 'Sign in to continue',
      email: 'Email',
      password: 'Password',
      emailPlaceholder: 'Enter your email',
      passwordPlaceholder: 'Enter your password',
      login: 'Sign In',
      loggingIn: 'Signing in...',
      fillAllFields: 'Please fill in all fields',
      invalidCredentials: 'Invalid email or password',
      loginError: 'Login error. Please try again.',
      demoCredentials: 'Demo Credentials'
    },
    modals: {
      addTask: 'Add New Task',
      editTask: 'Edit Task',
      pomodoroSettings: 'Pomodoro Settings',
      settings: 'Settings'
    },
    messages: {
      taskAdded: 'Task added successfully!',
      taskUpdated: 'Task updated successfully!',
      taskDeleted: 'Task deleted successfully!',
      taskMoved: 'Task moved successfully!',
      settingsSaved: 'Settings saved successfully!',
      pomodoroConfigSaved: 'Pomodoro configuration saved!',
      columnAdded: 'Column added successfully!',
      columnDeleted: 'Column deleted successfully!',
      columnRenamed: 'Column renamed successfully!',
      confirmDeleteTask: 'Are you sure you want to delete this task?',
      confirmLogout: 'Are you sure you want to logout?'
    }
  },
  'es-ES': {
    common: {
      save: 'Guardar',
      cancel: 'Cancelar',
      reset: 'Restablecer',
      close: 'Cerrar',
      loading: 'Cargando...',
      error: 'Error',
      retry: 'Reintentar'
    },
    navigation: {
      home: 'Inicio',
      reports: 'Reportes',
      settings: 'Configuración',
      logout: 'Cerrar Sesión'
    },
    reports: {
      title: 'Reportes',
      totalCompleted: 'Total Completadas',
      completedToday: 'Completadas Hoy',
      completedThisWeek: 'Completadas Esta Semana',
      today: 'Hoy',
      yesterday: 'Ayer',
      history: 'Historial',
      tasks: 'tareas',
      dateLocale: 'es-ES'
    },
    tasks: {
      title: 'Tareas',
      addTask: 'Agregar Tarea',
      editTask: 'Editar Tarea',
      deleteTask: 'Eliminar Tarea',
      taskTitle: 'Título de la Tarea',
      taskDescription: 'Descripción',
      taskStatus: 'Estado',
      taskTags: 'Etiquetas',
      addTag: 'Agregar Etiqueta',
      removeTag: 'Remover Etiqueta',
      moveTask: 'Mover Tarea',
      noTasks: 'No se encontraron tareas',
      noTasksInColumn: 'No hay tareas en esta columna',
      noMatchingTags: 'No se encontraron etiquetas',
      noExistingTags: 'No hay etiquetas existentes',
      noDescription: 'No se proporcionó descripción',
      noTags: 'Sin etiquetas'
    },
    status: {
      todo: 'Por Hacer',
      doing: 'En Progreso',
      done: 'Completado'
    },
    pomodoro: {
      title: 'Pomodoro',
      settings: 'Configuración del Pomodoro',
      workTime: 'Tiempo de Trabajo (minutos)',
      shortBreak: 'Descanso Corto (minutos)',
      longBreak: 'Descanso Largo (minutos)',
      start: 'Iniciar',
      pause: 'Pausar',
      reset: 'Restablecer',
      complete: 'Completar',
      workSession: 'Sesión de Trabajo',
      shortBreakSession: 'Descanso Corto',
      longBreakSession: 'Descanso Largo',
      dailySprints: 'Sprints Diarios',
      pomodorosToday: 'Pomodoros Hoy',
      noPomodorosToday: 'No se completaron pomodoros hoy',
      startWorkSession: 'Inicia una sesión de trabajo para ver tu progreso aquí',
      seeProgressHere: 'Inicia una sesión de trabajo para ver tu progreso aquí',
      quickPresets: 'Presets Rápidos',
      default: 'Predeterminado',
      focus: 'Enfoque',
      calm: 'Tranquilo',
      workButton: 'Trabajo',
      shortBreakButton: 'Corto',
      longBreakButton: 'Largo'
    },
    settings: {
      title: 'Configuración',
      pomodoroEnabled: 'Pomodoro Habilitado',
      pomodoroDisabled: 'Pomodoro Deshabilitado',
      columns: 'Columnas',
      addColumn: 'Agregar Columna',
      deleteColumn: 'Eliminar Columna',
      columnName: 'Nombre de la Columna',
      dragToReorder: 'Arrastra para reordenar',
      completionColumnEnabled: 'Columna de conclusión activada',
      completionColumnDisabled: 'Marcar como columna de conclusión',
      completionColumnLegend: 'Columna de Conclusión',
      completionColumnDescription: 'Las tareas en esta columna no aparecerán al día siguiente y se verán completadas.',
      language: 'Idioma',
      languageDescription: 'Elige tu idioma preferido',
      theme: 'Tema',
      lightMode: 'Modo Claro',
      darkMode: 'Modo Oscuro'
    },
    auth: {
      welcome: '¡Bienvenido de vuelta!',
      loginToContinue: 'Inicia sesión para continuar',
      email: 'Correo electrónico',
      password: 'Contraseña',
      emailPlaceholder: 'Ingresa tu correo electrónico',
      passwordPlaceholder: 'Ingresa tu contraseña',
      login: 'Iniciar Sesión',
      loggingIn: 'Iniciando sesión...',
      fillAllFields: 'Por favor, completa todos los campos',
      invalidCredentials: 'Correo electrónico o contraseña incorrectos',
      loginError: 'Error al iniciar sesión. Inténtalo de nuevo.',
      demoCredentials: 'Credenciales de Demostración'
    },
    modals: {
      addTask: 'Agregar Nueva Tarea',
      editTask: 'Editar Tarea',
      pomodoroSettings: 'Configuración del Pomodoro',
      settings: 'Configuración'
    },
    messages: {
      taskAdded: '¡Tarea agregada exitosamente!',
      taskUpdated: '¡Tarea actualizada exitosamente!',
      taskDeleted: '¡Tarea eliminada exitosamente!',
      taskMoved: '¡Tarea movida exitosamente!',
      settingsSaved: '¡Configuración guardada exitosamente!',
      pomodoroConfigSaved: '¡Configuración del Pomodoro guardada!',
      columnAdded: '¡Columna agregada exitosamente!',
      columnDeleted: '¡Columna eliminada exitosamente!',
      columnRenamed: '¡Columna renombrada exitosamente!',
      confirmDeleteTask: '¿Estás seguro de que quieres eliminar esta tarea?',
      confirmLogout: '¿Estás seguro de que quieres cerrar sesión?'
    }
  }
};

// Idioma padrão
const DEFAULT_LANGUAGE: Language = 'pt-BR';

// Função para obter idioma do navegador
const getBrowserLanguage = (): Language => {
  const browserLang = navigator.language;
  
  if (browserLang.startsWith('pt')) return 'pt-BR';
  if (browserLang.startsWith('en')) return 'en-US';
  if (browserLang.startsWith('es')) return 'es-ES';
  
  return DEFAULT_LANGUAGE;
};

// Função para obter idioma salvo ou padrão
const getSavedLanguage = (): Language => {
  try {
    const saved = localStorage.getItem('app-language');
    if (saved && saved in translations) {
      return saved as Language;
    }
  } catch (error) {
    console.error('Error loading language:', error);
  }
  
  const browserLang = getBrowserLanguage();
  return browserLang;
};

// Classe principal de internacionalização
class I18n {
  private currentLanguage: Language;
  private translations: Record<Language, Translation>;

  constructor() {
    this.currentLanguage = getSavedLanguage();
    this.translations = translations;
  }

  // Obter idioma atual
  getLanguage(): Language {
    return this.currentLanguage;
  }

  // Definir idioma
  setLanguage(language: Language): void {
    this.currentLanguage = language;
    localStorage.setItem('app-language', language);
    
    // Disparar evento para notificar mudança
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: language }));
  }

  // Obter tradução
  t(key: string): string {
    const keys = key.split('.');
    let value: any = this.translations[this.currentLanguage];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  }

  // Obter todas as traduções do idioma atual
  getTranslations(): Translation {
    return this.translations[this.currentLanguage];
  }

  // Obter idiomas disponíveis
  getAvailableLanguages(): { code: Language; name: string; flag: string }[] {
    return [
      { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
      { code: 'en-US', name: 'English', flag: '🇺🇸' },
      { code: 'es-ES', name: 'Español', flag: '🇪🇸' }
    ];
  }

  // Verificar se uma chave existe
  hasKey(key: string): boolean {
    const keys = key.split('.');
    let value: any = this.translations[this.currentLanguage];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return false;
      }
    }

    return typeof value === 'string';
  }
}

// Instância global
export const i18n = new I18n();



// Hook para usar traduções
import { useState, useEffect } from "react";

export const useTranslation = () => {
  // Força re-render ao trocar o idioma
  const [, setRerender] = useState(0);

  useEffect(() => {
    const handler = () => {
      setRerender(prev => prev + 1);
    };
    
    window.addEventListener('languageChanged', handler);
    return () => window.removeEventListener('languageChanged', handler);
  }, []);

  // Sempre retornar o idioma atual do i18n para garantir que está atualizado
  const currentLanguage = i18n.getLanguage();

  return {
    t: i18n.t.bind(i18n),
    language: currentLanguage,
    setLanguage: i18n.setLanguage.bind(i18n),
    availableLanguages: i18n.getAvailableLanguages(),
    hasKey: i18n.hasKey.bind(i18n)
  };
};

// Função helper para tradução direta
export const t = (key: string): string => i18n.t(key); 