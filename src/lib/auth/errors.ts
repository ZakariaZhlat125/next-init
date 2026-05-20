import { AuthError } from '@/types/auth';

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  ACCOUNT_LOCKED: 'ACCOUNT_LOCKED',
  EMAIL_NOT_VERIFIED: 'EMAIL_NOT_VERIFIED',
  NETWORK_ERROR: 'NETWORK_ERROR',
  SESSION_EXPIRED: 'SESSION_EXPIRED',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  WEAK_PASSWORD: 'WEAK_PASSWORD',
  INVALID_TOKEN: 'INVALID_TOKEN',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

export function mapErrorToAuthError(error: any): AuthError {
  if (!error) {
    return {
      code: AUTH_ERRORS.UNKNOWN_ERROR,
      message: 'An unexpected error occurred',
    };
  }

  const errorCode = error.response?.data?.code || error.code;
  const errorMessage = error.response?.data?.message || error.message;
  const field = error.response?.data?.field;

  switch (errorCode) {
    case 'INVALID_CREDENTIALS':
    case 'CredentialsSignin':
      return {
        code: AUTH_ERRORS.INVALID_CREDENTIALS,
        message: 'Invalid email or password',
      };

    case 'ACCOUNT_LOCKED':
      return {
        code: AUTH_ERRORS.ACCOUNT_LOCKED,
        message: 'Your account has been locked. Please contact support.',
      };

    case 'EMAIL_NOT_VERIFIED':
      return {
        code: AUTH_ERRORS.EMAIL_NOT_VERIFIED,
        message: 'Please verify your email address before logging in.',
      };

    case 'SESSION_EXPIRED':
      return {
        code: AUTH_ERRORS.SESSION_EXPIRED,
        message: 'Your session has expired. Please log in again.',
      };

    case 'RATE_LIMIT_EXCEEDED':
      return {
        code: AUTH_ERRORS.RATE_LIMIT_EXCEEDED,
        message: 'Too many attempts. Please try again later.',
      };

    case 'USER_NOT_FOUND':
      return {
        code: AUTH_ERRORS.USER_NOT_FOUND,
        message: 'User not found',
      };

    case 'EMAIL_ALREADY_EXISTS':
      return {
        code: AUTH_ERRORS.EMAIL_ALREADY_EXISTS,
        message: 'An account with this email already exists',
        field: 'email',
      };

    case 'WEAK_PASSWORD':
      return {
        code: AUTH_ERRORS.WEAK_PASSWORD,
        message: 'Password does not meet security requirements',
        field: 'password',
      };

    case 'INVALID_TOKEN':
    case 'TOKEN_EXPIRED':
      return {
        code: AUTH_ERRORS.INVALID_TOKEN,
        message: 'Invalid or expired reset token',
      };

    default:
      if (error.response?.status === 401) {
        return {
          code: AUTH_ERRORS.INVALID_CREDENTIALS,
          message: 'Invalid credentials',
        };
      }

      if (error.response?.status === 429) {
        return {
          code: AUTH_ERRORS.RATE_LIMIT_EXCEEDED,
          message: 'Too many requests. Please try again later.',
        };
      }

      if (!error.response) {
        return {
          code: AUTH_ERRORS.NETWORK_ERROR,
          message: 'Network error. Please check your connection.',
        };
      }

      return {
        code: AUTH_ERRORS.UNKNOWN_ERROR,
        message: errorMessage || 'An unexpected error occurred',
        field,
      };
  }
}
