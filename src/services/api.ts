// Configuration de l'API - Remplacez par l'URL de votre backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Types
export interface Photo {
  id: string;
  title: string;
  description?: string;
  url: string;
  thumbnail?: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Video {
  id: string;
  title: string;
  description?: string;
  url: string;
  thumbnail: string;
  category?: string;
  duration?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  location?: string;
  category: string;
  featured: boolean;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Utilitaire pour les requêtes
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('auth_token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Une erreur est survenue' }));
    throw new Error(error.message || `Erreur ${response.status}`);
  }

  return response.json();
}

// Auth API
export const authApi = {
  login: (credentials: LoginCredentials) =>
    request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () =>
    request<User>('/auth/me'),

  getStoredUser: (): User | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: () => localStorage.getItem('auth_token'),

  setAuth: (token: string, user: User) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },
};

// Photos API
export const photosApi = {
  getAll: () => request<Photo[]>('/photos'),
  
  getById: (id: string) => request<Photo>(`/photos/${id}`),
  
  create: (data: FormData) =>
    fetch(`${API_BASE_URL}/photos`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
      body: data,
    }).then(res => res.json()),
  
  update: (id: string, data: Partial<Photo>) =>
    request<Photo>(`/photos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  delete: (id: string) =>
    request<void>(`/photos/${id}`, { method: 'DELETE' }),
};

// Videos API
export const videosApi = {
  getAll: () => request<Video[]>('/videos'),
  
  getById: (id: string) => request<Video>(`/videos/${id}`),
  
  create: (data: FormData) =>
    fetch(`${API_BASE_URL}/videos`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
      body: data,
    }).then(res => res.json()),
  
  update: (id: string, data: Partial<Video>) =>
    request<Video>(`/videos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  delete: (id: string) =>
    request<void>(`/videos/${id}`, { method: 'DELETE' }),
};

// Announcements API
export const announcementsApi = {
  getAll: () => request<Announcement[]>('/announcements'),
  
  getById: (id: string) => request<Announcement>(`/announcements/${id}`),
  
  create: (data: Omit<Announcement, 'id' | 'createdAt' | 'updatedAt'>) =>
    request<Announcement>('/announcements', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  update: (id: string, data: Partial<Announcement>) =>
    request<Announcement>(`/announcements/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  delete: (id: string) =>
    request<void>(`/announcements/${id}`, { method: 'DELETE' }),
};

// Dashboard Stats API
export interface DashboardStats {
  totalPhotos: number;
  totalVideos: number;
  totalAnnouncements: number;
  recentActivity: {
    type: 'photo' | 'video' | 'announcement';
    action: 'created' | 'updated' | 'deleted';
    title: string;
    date: string;
  }[];
}

export const dashboardApi = {
  getStats: () => request<DashboardStats>('/dashboard/stats'),
};
