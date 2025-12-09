// User types
export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
}

// Pet types
export interface Pet {
  _id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  description: string;
  status: 'available' | 'adopted' | 'pending';
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// Application types
export interface Application {
  _id: string;
  user: string | User;
  pet: string | Pet;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

// Auth types
export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
