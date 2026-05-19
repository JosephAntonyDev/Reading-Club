export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  cover: string;
  description: string;
  pages: number;
  rating: number;
  year: number;
  language: string;
  progress?: number;
  state?: 'reading' | 'completed' | 'want-to-read';
  review?: string;
  dateAdded?: string;
}

export interface Club {
  id: number;
  name: string;
  description: string;
  bookId: number;
  coverImage: string;
  members: ClubMember[];
  maxMembers: number;
  category: string;
  createdAt: string;
  ownerId: number;
  isPublic: boolean;
  nextSession?: string;
}

export interface ClubMember {
  id: number;
  name: string;
  avatar: string;
  role: 'owner' | 'moderator' | 'member';
  joinedAt: string;
}

export interface Comment {
  id: number;
  userId: number;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
  clubId: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  favoriteGenres: string[];
  booksRead: number;
  clubsJoined: number;
  memberSince: string;
}

export type Language = 'es' | 'en';

export interface AppSettings {
  language: Language;
  theme: 'light' | 'dark';
}
