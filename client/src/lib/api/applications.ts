import { apiClient } from './client';
import { Application } from '@/types';

interface ApplicationResponse {
  applications: Application[];
}

export const applicationApi = {
  // User: Apply for a pet
  applyForPet: async (petId: string): Promise<Application> => {
    const response = await apiClient.post<{ application: Application }>('/applications', { petId });
    return response.data.application;
  },

  // User: Get own applications
  getMyApplications: async (): Promise<Application[]> => {
    const response = await apiClient.get<ApplicationResponse>('/applications/my');
    return response.data.applications;
  },

  // Admin: Get all applications
  getAllApplications: async (): Promise<Application[]> => {
    const response = await apiClient.get<ApplicationResponse>('/applications');
    return response.data.applications;
  },

  // Admin: Update application status
  updateApplicationStatus: async (
    applicationId: string,
    status: 'approved' | 'rejected'
  ): Promise<Application> => {
    const response = await apiClient.patch<{ application: Application }>(
      `/applications/${applicationId}/status`,
      { status }
    );
    return response.data.application;
  },
};
