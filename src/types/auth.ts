import { UserSection } from './roles';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  roles: string[];
  permissions: string[];
  establishments?: Establishment[];
  section?: UserSection;
  currentEstablishmentSlug?: string;
}

export interface Establishment {
  id: string;
  name: string;
  slug?: string;
  isActive: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
    expiresIn?: number;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface CompanyRegisterData {
  company_name: string;
  legal_name: string;
  tax_number: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
}

export interface AuthError {
  code: string;
  message: string;
  field?: string;
}

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';
