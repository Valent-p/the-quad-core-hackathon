import { storage } from './storage';
import type { Doctor, Patient, BlogPost } from './storage';

const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Valentino Phiri',
    specialization: 'Cardiologist',
    email: 'valentino.phiri@MediCoreAI.com',
  },
  {
    id: 'd2',
    name: 'Dr. Josephy Ndayiwala',
    specialization: 'Neurologist',
    email: 'josephy.ndayiwala@MediCoreAI.com',
  },
];

const MOCK_PATIENTS: Patient[] = [
  {
    id: 'p1',
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    condition: 'Hypertension',
    status: 'Stable',
    lastVisit: '2024-02-10',
    doctorManagedBy: 'd1',
  },
  {
    id: 'p2',
    name: 'Jane Smith',
    age: 32,
    gender: 'Female',
    condition: 'Migraine',
    status: 'Recovering',
    lastVisit: '2024-02-12',
    doctorManagedBy: 'd2',
  },
];

const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Understanding Heart Health',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    authorId: 'd1',
    date: '2024-02-14',
    tags: ['Heart', 'Health', 'Tips'],
  },
];

export const initializeMockData = () => {
  if (!storage.get('doctors')) {
    storage.set('doctors', MOCK_DOCTORS);
  }
  if (!storage.get('patients')) {
    storage.set('patients', MOCK_PATIENTS);
  }
  if (!storage.get('blog_posts')) {
    storage.set('blog_posts', MOCK_BLOG_POSTS);
  }
};
