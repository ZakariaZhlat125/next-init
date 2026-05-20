import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      avatar?: string;
      roles: string[];
      permissions: string[];
      establishments?: Array<{
        id: string;
        name: string;
        isActive: boolean;
      }>;
    };
    accessToken: string;
    refreshToken: string;
    error?: string;
  }

  interface User extends DefaultUser {
    accessToken: string;
    refreshToken: string;
    roles: string[];
    permissions: string[];
    establishments?: Array<{
      id: string;
      name: string;
      isActive: boolean;
    }>;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    user: {
      id: string;
      email: string;
      name: string;
      avatar?: string;
      roles: string[];
      permissions: string[];
      establishments?: Array<{
        id: string;
        name: string;
        isActive: boolean;
      }>;
    };
    error?: string;
  }
}
