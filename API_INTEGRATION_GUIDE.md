# Guia de Integração da API - To-Do App

Este documento descreve todas as rotas da API necessárias para integrar com o frontend do To-Do App e como implementar a integração.

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Autenticação](#autenticação)
3. [Tarefas](#tarefas)
4. [Configurações](#configurações)
5. [Pomodoro](#pomodoro)
6. [Tema e Idioma](#tema-e-idioma)
7. [Implementação da Integração](#implementação-da-integração)
8. [Estrutura de Dados](#estrutura-de-dados)
9. [Tratamento de Erros](#tratamento-de-erros)

## 🎯 Visão Geral

O frontend atualmente usa localStorage para persistir dados. Para integrar com uma API real, você precisará:

- **Base URL**: `http://localhost:3001/api` (ou sua URL de produção)
- **Autenticação**: JWT Bearer Token
- **Content-Type**: `application/json`
- **CORS**: Habilitado para o domínio do frontend

## 🔐 Autenticação

### 1. Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "joao@example.com",
  "password": "123456"
}
```

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "user": {
    "id": "1",
    "name": "João Silva",
    "email": "joao@example.com",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=João"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Resposta de Erro (401):**
```json
{
  "success": false,
  "message": "Credenciais inválidas"
}
```

### 2. Verificar Token
```http
GET /api/auth/me
Authorization: Bearer <token>
```

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "user": {
    "id": "1",
    "name": "João Silva",
    "email": "joao@example.com",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=João"
  }
}
```

### 3. Logout
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

**Resposta (200):**
```json
{
  "success": true,
  "message": "Logout realizado com sucesso"
}
```

## 📝 Tarefas

### 1. Listar Tarefas
```http
GET /api/tasks
Authorization: Bearer <token>
```

**Resposta (200):**
```json
{
  "success": true,
  "tasks": [
    {
      "id": "1",
      "title": "Implementar API",
      "description": "Criar todas as rotas necessárias",
      "status": "todo",
      "tags": ["backend", "api"],
      "completedAt": null,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### 2. Criar Tarefa
```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Nova Tarefa",
  "description": "Descrição da tarefa",
  "status": "todo",
  "tags": ["urgente", "frontend"]
}
```

**Resposta (201):**
```json
{
  "success": true,
  "task": {
    "id": "2",
    "title": "Nova Tarefa",
    "description": "Descrição da tarefa",
    "status": "todo",
    "tags": ["urgente", "frontend"],
    "completedAt": null,
    "createdAt": "2024-01-15T11:00:00Z",
    "updatedAt": "2024-01-15T11:00:00Z"
  }
}
```

### 3. Atualizar Tarefa
```http
PUT /api/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Título Atualizado",
  "description": "Nova descrição",
  "status": "doing",
  "tags": ["urgente", "backend"]
}
```

**Resposta (200):**
```json
{
  "success": true,
  "task": {
    "id": "1",
    "title": "Título Atualizado",
    "description": "Nova descrição",
    "status": "doing",
    "tags": ["urgente", "backend"],
    "completedAt": null,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T11:15:00Z"
  }
}
```

### 4. Mover Tarefa (Mudar Status)
```http
PATCH /api/tasks/:id/move
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "done"
}
```

**Resposta (200):**
```json
{
  "success": true,
  "task": {
    "id": "1",
    "title": "Título Atualizado",
    "description": "Nova descrição",
    "status": "done",
    "tags": ["urgente", "backend"],
    "completedAt": "2024-01-15T11:20:00Z",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T11:20:00Z"
  }
}
```

### 5. Excluir Tarefa
```http
DELETE /api/tasks/:id
Authorization: Bearer <token>
```

**Resposta (200):**
```json
{
  "success": true,
  "message": "Tarefa excluída com sucesso"
}
```

## ⚙️ Configurações

### 1. Obter Configurações
```http
GET /api/settings
Authorization: Bearer <token>
```

**Resposta (200):**
```json
{
  "success": true,
  "settings": {
    "pomodoroEnabled": true,
    "columns": [
      {
        "id": "todo",
        "name": "Todo",
        "status": "todo",
        "order": 0,
        "isCompletionColumn": false
      },
      {
        "id": "doing",
        "name": "Doing",
        "status": "doing",
        "order": 1,
        "isCompletionColumn": false
      },
      {
        "id": "done",
        "name": "Done",
        "status": "done",
        "order": 2,
        "isCompletionColumn": true
      }
    ]
  }
}
```

### 2. Atualizar Configurações
```http
PUT /api/settings
Authorization: Bearer <token>
Content-Type: application/json

{
  "pomodoroEnabled": false,
  "columns": [
    {
      "id": "todo",
      "name": "A Fazer",
      "status": "todo",
      "order": 0,
      "isCompletionColumn": false
    },
    {
      "id": "doing",
      "name": "Em Andamento",
      "status": "doing",
      "order": 1,
      "isCompletionColumn": false
    },
    {
      "id": "done",
      "name": "Concluído",
      "status": "done",
      "order": 2,
      "isCompletionColumn": true
    }
  ]
}
```

**Resposta (200):**
```json
{
  "success": true,
  "settings": {
    "pomodoroEnabled": false,
    "columns": [...]
  }
}
```

## 🍅 Pomodoro

### 1. Obter Configuração do Pomodoro
```http
GET /api/pomodoro/config
Authorization: Bearer <token>
```

**Resposta (200):**
```json
{
  "success": true,
  "config": {
    "workTime": 1500,
    "shortBreak": 300,
    "longBreak": 900
  }
}
```

### 2. Atualizar Configuração do Pomodoro
```http
PUT /api/pomodoro/config
Authorization: Bearer <token>
Content-Type: application/json

{
  "workTime": 1800,
  "shortBreak": 300,
  "longBreak": 900
}
```

**Resposta (200):**
```json
{
  "success": true,
  "config": {
    "workTime": 1800,
    "shortBreak": 300,
    "longBreak": 900
  }
}
```

### 3. Obter Estatísticas Diárias
```http
GET /api/pomodoro/stats/daily
Authorization: Bearer <token>
```

**Resposta (200):**
```json
{
  "success": true,
  "stats": {
    "date": "2024-01-15",
    "totalPomodoros": 4,
    "totalWorkTime": 6000,
    "totalBreakTime": 1200,
    "sessions": [
      {
        "id": "1",
        "type": "work",
        "duration": 1500,
        "startTime": "2024-01-15T09:00:00Z",
        "endTime": "2024-01-15T09:25:00Z",
        "completed": true
      }
    ]
  }
}
```

### 4. Adicionar Sessão Completada
```http
POST /api/pomodoro/sessions
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "work",
  "duration": 1500,
  "startTime": "2024-01-15T09:00:00Z",
  "endTime": "2024-01-15T09:25:00Z",
  "completed": true
}
```

**Resposta (201):**
```json
{
  "success": true,
  "session": {
    "id": "2",
    "type": "work",
    "duration": 1500,
    "startTime": "2024-01-15T09:00:00Z",
    "endTime": "2024-01-15T09:25:00Z",
    "completed": true
  }
}
```

### 5. Obter Sessões de Hoje
```http
GET /api/pomodoro/sessions/today
Authorization: Bearer <token>
```

**Resposta (200):**
```json
{
  "success": true,
  "sessions": [
    {
      "id": "1",
      "type": "work",
      "duration": 1500,
      "startTime": "2024-01-15T09:00:00Z",
      "endTime": "2024-01-15T09:25:00Z",
      "completed": true
    }
  ]
}
```

## 🎨 Tema e Idioma

### 1. Obter Tema
```http
GET /api/user/theme
Authorization: Bearer <token>
```

**Resposta (200):**
```json
{
  "success": true,
  "theme": "dark"
}
```

### 2. Definir Tema
```http
PUT /api/user/theme
Authorization: Bearer <token>
Content-Type: application/json

{
  "theme": "light"
}
```

**Resposta (200):**
```json
{
  "success": true,
  "theme": "light"
}
```

### 3. Obter Idioma
```http
GET /api/user/language
Authorization: Bearer <token>
```

**Resposta (200):**
```json
{
  "success": true,
  "language": "pt-BR"
}
```

### 4. Definir Idioma
```http
PUT /api/user/language
Authorization: Bearer <token>
Content-Type: application/json

{
  "language": "en-US"
}
```

**Resposta (200):**
```json
{
  "success": true,
  "language": "en-US"
}
```

## 🔧 Implementação da Integração

### 1. Criar Serviço de API

Crie um arquivo `src/services/api.ts`:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

class ApiService {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth-token', token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('auth-token');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('auth-token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      if (response.status === 401) {
        this.clearToken();
        window.location.href = '/login';
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Auth
  async login(email: string, password: string) {
    const response = await this.request<{
      success: boolean;
      user: any;
      token: string;
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.success) {
      this.setToken(response.token);
    }

    return response;
  }

  async getCurrentUser() {
    return this.request<{ success: boolean; user: any }>('/auth/me');
  }

  async logout() {
    await this.request('/auth/logout', { method: 'POST' });
    this.clearToken();
  }

  // Tasks
  async getTasks() {
    return this.request<{ success: boolean; tasks: any[] }>('/tasks');
  }

  async createTask(task: any) {
    return this.request<{ success: boolean; task: any }>('/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    });
  }

  async updateTask(id: string, updates: any) {
    return this.request<{ success: boolean; task: any }>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async moveTask(id: string, status: string) {
    return this.request<{ success: boolean; task: any }>(`/tasks/${id}/move`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async deleteTask(id: string) {
    return this.request<{ success: boolean; message: string }>(`/tasks/${id}`, {
      method: 'DELETE',
    });
  }

  // Settings
  async getSettings() {
    return this.request<{ success: boolean; settings: any }>('/settings');
  }

  async updateSettings(settings: any) {
    return this.request<{ success: boolean; settings: any }>('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  }

  // Pomodoro
  async getPomodoroConfig() {
    return this.request<{ success: boolean; config: any }>('/pomodoro/config');
  }

  async updatePomodoroConfig(config: any) {
    return this.request<{ success: boolean; config: any }>('/pomodoro/config', {
      method: 'PUT',
      body: JSON.stringify(config),
    });
  }

  async getPomodoroStats() {
    return this.request<{ success: boolean; stats: any }>('/pomodoro/stats/daily');
  }

  async addPomodoroSession(session: any) {
    return this.request<{ success: boolean; session: any }>('/pomodoro/sessions', {
      method: 'POST',
      body: JSON.stringify(session),
    });
  }

  async getTodaySessions() {
    return this.request<{ success: boolean; sessions: any[] }>('/pomodoro/sessions/today');
  }

  // User Preferences
  async getTheme() {
    return this.request<{ success: boolean; theme: string }>('/user/theme');
  }

  async setTheme(theme: string) {
    return this.request<{ success: boolean; theme: string }>('/user/theme', {
      method: 'PUT',
      body: JSON.stringify({ theme }),
    });
  }

  async getLanguage() {
    return this.request<{ success: boolean; language: string }>('/user/language');
  }

  async setLanguage(language: string) {
    return this.request<{ success: boolean; language: string }>('/user/language', {
      method: 'PUT',
      body: JSON.stringify({ language }),
    });
  }
}

export const apiService = new ApiService();
```

### 2. Atualizar Contextos

#### AuthContext.tsx
```typescript
import { apiService } from '../services/api';

// No AuthProvider
const login = async (email: string, password: string): Promise<boolean> => {
  setIsLoading(true);
  
  try {
    const response = await apiService.login(email, password);
    if (response.success) {
      setUser(response.user);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  } finally {
    setIsLoading(false);
  }
};

const logout = () => {
  apiService.logout();
  setUser(null);
};
```

#### TaskContext.tsx
```typescript
import { apiService } from '../services/api';

// No TaskProvider
useEffect(() => {
  const loadTasks = async () => {
    try {
      const response = await apiService.getTasks();
      if (response.success) {
        setTasks(response.tasks);
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };
  
  loadTasks();
}, []);

const addTask = async (task: Omit<Task, "id">) => {
  try {
    const response = await apiService.createTask(task);
    if (response.success) {
      setTasks(prev => [...prev, response.task]);
    }
  } catch (error) {
    console.error('Error creating task:', error);
  }
};

const updateTask = async (taskId: string, updates: Partial<Task>) => {
  try {
    const response = await apiService.updateTask(taskId, updates);
    if (response.success) {
      setTasks(prev => prev.map(task => 
        task.id === taskId ? response.task : task
      ));
    }
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

const removeTask = async (taskId: string) => {
  try {
    const response = await apiService.deleteTask(taskId);
    if (response.success) {
      setTasks(prev => prev.filter(task => task.id !== taskId));
    }
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

const handleMoveTask = async (taskId: string, newStatus: string) => {
  try {
    const response = await apiService.moveTask(taskId, newStatus);
    if (response.success) {
      setTasks(prev => prev.map(task => 
        task.id === taskId ? response.task : task
      ));
    }
  } catch (error) {
    console.error('Error moving task:', error);
  }
};
```

## 📊 Estrutura de Dados

### Tabelas do Banco de Dados

```sql
-- Usuários
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  avatar VARCHAR(500),
  theme VARCHAR(10) DEFAULT 'dark',
  language VARCHAR(10) DEFAULT 'pt-BR',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tarefas
CREATE TABLE tasks (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) NOT NULL,
  tags JSON,
  completed_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Configurações
CREATE TABLE settings (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  pomodoro_enabled BOOLEAN DEFAULT TRUE,
  columns JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Configuração do Pomodoro
CREATE TABLE pomodoro_configs (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  work_time INT DEFAULT 1500,
  short_break INT DEFAULT 300,
  long_break INT DEFAULT 900,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Sessões do Pomodoro
CREATE TABLE pomodoro_sessions (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  type ENUM('work', 'short-break', 'long-break') NOT NULL,
  duration INT NOT NULL,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## ⚠️ Tratamento de Erros

### Códigos de Status HTTP

- **200**: Sucesso
- **201**: Criado com sucesso
- **400**: Dados inválidos
- **401**: Não autorizado
- **403**: Proibido
- **404**: Não encontrado
- **500**: Erro interno do servidor

### Estrutura de Erro Padrão

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dados inválidos",
    "details": {
      "field": "title",
      "message": "Título é obrigatório"
    }
  }
}
```

### Implementar Interceptor de Erros

```typescript
// No apiService
private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  try {
    const token = this.getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        this.clearToken();
        window.location.href = '/login';
        throw new Error('Sessão expirada');
      }
      
      throw new Error(data.error?.message || `Erro ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
```

## 🚀 Próximos Passos

1. **Criar a API** seguindo as rotas especificadas
2. **Implementar autenticação JWT**
3. **Criar as tabelas do banco de dados**
4. **Substituir localStorage por chamadas HTTP** nos contextos
5. **Implementar tratamento de erros**
6. **Adicionar loading states**
7. **Implementar cache local para melhor performance**
8. **Adicionar sincronização offline**

## 📝 Notas Importantes

- **CORS**: Configure o CORS no backend para permitir requisições do frontend
- **Validação**: Implemente validação de dados no backend
- **Segurança**: Use HTTPS em produção
- **Rate Limiting**: Implemente rate limiting para evitar abuso
- **Logs**: Adicione logs para monitoramento
- **Testes**: Crie testes para as rotas da API 