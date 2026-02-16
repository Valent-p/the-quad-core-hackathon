import { storage } from './storage';
import type { Doctor, Patient, BlogPost } from './storage';

const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Valentino Phiri',
    specialization: 'Chief of Medicine & AI Research (Malawi)',
    email: 'valentino.phiri@MediCoreAI.com',
    avatar: '/images/valentino.jpg'
  },
  {
    id: 'd2',
    name: 'Dr. Josephy',
    specialization: 'Head of Neurology',
    email: 'josephy@MediCoreAI.com',
    avatar: '/images/josephy.jpg'
  },
  {
    id: 'd3',
    name: 'Dr. Keith',
    specialization: 'Surgical Director',
    email: 'keith@MediCoreAI.com',
    avatar: '/images/keith.jpg'
  },
  {
    id: 'd4',
    name: 'Dr. Nkosi',
    specialization: 'Infectious Diseases Expert',
    email: 'nkosi@MediCoreAI.com',
    avatar: '/images/nkosi.jpg'
  },
];

const MOCK_PATIENTS: Patient[] = [
  { id: 'p1', name: 'John Doe', age: 45, gender: 'Male', condition: 'Hypertension', status: 'Stable', lastVisit: '2024-02-10', doctorManagedBy: 'd1' },
  { id: 'p2', name: 'Jane Smith', age: 32, gender: 'Female', condition: 'Migraine', status: 'Recovering', lastVisit: '2024-02-12', doctorManagedBy: 'd2' },
  { id: 'p3', name: 'Robert Brown', age: 67, gender: 'Male', condition: 'Diabetes Type 2', status: 'Stable', lastVisit: '2024-02-14', doctorManagedBy: 'd1' },
  { id: 'p4', name: 'Alice Johnson', age: 28, gender: 'Female', condition: 'Asthma', status: 'Stable', lastVisit: '2024-02-15', doctorManagedBy: 'd1' },
  { id: 'p5', name: 'Michael Davis', age: 54, gender: 'Male', condition: 'Post-Surgery', status: 'Critical', lastVisit: '2024-02-16', doctorManagedBy: 'd2' },
];

const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Understanding Heart Health',
    content: 'Your heart is the engine of your body. Maintaining it requires a balanced diet, regular exercise, and stress management. Recent studies show that even 15 minutes of daily walking can reduce cardiovascular risks by 20%.',
    authorId: 'd1',
    date: '2024-02-14',
    tags: ['Heart', 'Health', 'Tips'],
    image: '/images/heart-blog.jpg'
  },
  {
    id: 'b2',
    title: 'Managing Stress in a High-Paced Environment',
    content: 'In todays fast-moving world, mental burnout is becoming more common. We discuss techniques such as mindfulness meditation and digital detoxes that can help restore your focus and energy.',
    authorId: 'd2',
    date: '2024-02-15',
    tags: ['Mental Health', 'Wellness'],
    image: '/images/stress-blog.jpg'
  },
  {
    id: 'b3',
    title: 'The Future of AI in Modern Medicine',
    content: 'AI is no longer a sci-fi concept. From diagnostics to predictive patient care, algorithms are helping doctors make faster, more accurate decisions. MediCore AI is at the forefront of this revolution.',
    authorId: 'd1',
    date: '2024-02-16',
    tags: ['Technology', 'AI', 'Future'],
    image: '/images/ai-blog.jpg'
  },
];

export const initializeMockData = () => {
  if (!storage.get('doctors')) {
    storage.set('doctors', MOCK_DOCTORS);
  }
  // Always refresh patients and blog posts for the demo if requested or if missing
  if (!storage.get('patients')) {
    storage.set('patients', MOCK_PATIENTS);
  }
  if (!storage.get('blog_posts')) {
    storage.set('blog_posts', MOCK_BLOG_POSTS);
  }
};
