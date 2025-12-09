import { apiClient } from './client';
import { Pet, PaginatedResponse } from '@/types';

export interface PetFilters {
  search?: string;
  species?: string;
  breed?: string;
  age?: number;
  status?: string;
  page?: number;
  limit?: number;
}

export const petApi = {
  getPets: async (filters: PetFilters = {}): Promise<PaginatedResponse<Pet>> => {
    const params = new URLSearchParams();

    if (filters.search) params.append('search', filters.search);
    if (filters.species) params.append('species', filters.species);
    if (filters.breed) params.append('breed', filters.breed);
    if (filters.age) params.append('age', filters.age.toString());
    if (filters.status) params.append('status', filters.status);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());

    const response = await apiClient.get<PaginatedResponse<Pet>>(`/pets?${params.toString()}`);
    return response.data;
  },

  getPetById: async (id: string): Promise<Pet> => {
    const response = await apiClient.get<Pet>(`/pets/${id}`);
    return response.data;
  },
};
