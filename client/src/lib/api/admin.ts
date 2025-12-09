import { apiClient } from './client';
import { Pet } from '@/types';

export const adminApi = {
  // Create a new pet
  createPet: async (petData: Omit<Pet, '_id' | 'createdAt' | 'updatedAt'>): Promise<Pet> => {
    const response = await apiClient.post<Pet>('/pets', petData);
    return response.data;
  },

  // Update a pet
  updatePet: async (petId: string, petData: Partial<Pet>): Promise<Pet> => {
    const response = await apiClient.put<Pet>(`/pets/${petId}`, petData);
    return response.data;
  },

  // Delete a pet
  deletePet: async (petId: string): Promise<void> => {
    await apiClient.delete(`/pets/${petId}`);
  },
};
