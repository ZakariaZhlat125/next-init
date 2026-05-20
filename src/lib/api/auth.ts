import apiClient from './client';
import {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  CompanyRegisterData,
  ForgotPasswordData,
  ResetPasswordData,
  User,
} from '@/types/auth';

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Send only email and password to Laravel
    const { email, password } = credentials;
    const response = await apiClient.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  async registerCompany(data: CompanyRegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register-company', data);
    return response.data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  },

  async forgotPassword(data: ForgotPasswordData): Promise<{ message?: string }> {
    const response = await apiClient.post<{ message?: string }>('/auth/forgot-password', data);
    return response.data;
  },

  async resetPassword(data: ResetPasswordData): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>('/auth/reset-password', data);
    return response.data;
  },

  async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    const response = await apiClient.post<{ accessToken: string; refreshToken: string }>(
      '/auth/refresh',
      { refreshToken }
    );
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  },
};

export default authApi;
