/**
 * Simple localStorage wrapper to simulate a backend.
 */

export const storage = {
  get: <T>(key: string): T | null => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },

  set: <T>(key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  update: <T>(key: string, updater: (data: T) => T): void => {
    const current = storage.get<T>(key);
    if (current) {
      storage.set(key, updater(current));
    }
  },

  remove: (key: string): void => {
    localStorage.removeItem(key);
  },

  clear: (): void => {
    localStorage.clear();
  },

  // Session management
  getSession: () => storage.get<{ user: Doctor }>('session'),
  login: (user: Doctor) => storage.set('session', { user }),
  logout: () => storage.remove('session'),
};

// Types for our "database"
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition: string;
  status: 'Critical' | 'Stable' | 'Recovering';
  lastVisit: string;
  doctorManagedBy: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  email: string;
  avatar?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  date: string;
  tags: string[];
  image?: string;
}
