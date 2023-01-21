import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import LineProvider from 'next-auth/providers/line';
import TwitterProvider from 'next-auth/providers/twitter';

const prisma = new PrismaClient();
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.PICKER_GOOGLE_AUTH_CLIENT_ID || '',
      clientSecret: process.env.PICKER_GOOGLE_AUTH_CLIENT_SECRET || '',
    }),
    LineProvider({
      clientId: process.env.PICKER_LINE_AUTH_CLIENT_ID || '',
      clientSecret: process.env.PICKER_LINE_AUTH_CLIENT_SECRET || '',
    }),
    TwitterProvider({
      clientId: process.env.PICKER_TWITTER_AUTH_CLIENT_ID || '',
      clientSecret: process.env.PICKER_TWITTER_AUTH_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;

        const count = await prisma.userProfile.count({
          where: {
            userId: user.id,
          },
        });

        session.user.hasProfile = !!count;
      }

      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login', // Error code passed in query string as ?error=
    newUser: '/profile/edit', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

export default NextAuth(authOptions);
