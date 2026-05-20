/**
 * NextAuth.js Configuration
 * 
 * Required Environment Variables:
 * - NEXTAUTH_URL: Your application URL (e.g., http://localhost:3000)
 * - NEXTAUTH_SECRET: Random secret key (generate with: openssl rand -base64 32)
 * - NEXT_PUBLIC_API_URL: Your backend API base URL
 */

import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { authApi } from '@/lib/api/auth';

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const response = await authApi.refreshToken(token.refreshToken);

    return {
      ...token,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      accessTokenExpires: Date.now() + 15 * 60 * 1000, // 15 minutes
    };
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Email and password are required');
          }

          // For Laravel Sanctum, we need to handle CSRF token if using session-based auth
          // For API token auth, we don't need CSRF
          const response = await authApi.login({
            email: credentials.email,
            password: credentials.password,
          });

          if (response.data.user && response.data.accessToken) {
            return {
              id: response.data.user.id,
              email: response.data.user.email,
              name: response.data.user.name,
              image: response.data.user.avatar,
              accessToken: response.data.accessToken,
              refreshToken: response.data.refreshToken,
              roles: response.data.user.roles || [],
              permissions: response.data.user.permissions || [],
              establishments: response.data.user.establishments || [],
            } as any;
          }

          return null;
        } catch (error: any) {
          console.error('Authorization error:', error);
          throw new Error(error.response?.data?.message || 'Invalid credentials');
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: Date.now() + 15 * 60 * 1000, // 15 minutes
          user: {
            id: user.id,
            email: user.email!,
            name: user.name!,
            avatar: user.image,
            roles: user.roles,
            permissions: user.permissions,
            establishments: user.establishments,
          },
        } as JWT;
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpires || 0)) {
        return token;
      }

      // Access token has expired, try to refresh it
      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.error = token.error;

      return session;
    },
  },

  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
  },

  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  jwt: {
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },

  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production',

  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
