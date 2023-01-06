import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import LineProvider from 'next-auth/providers/line';
import TwitterProvider from 'next-auth/providers/twitter';

const prisma = new PrismaClient();
export default NextAuth({
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
      }

      return session;
    },
  },
  pages: {
    signIn: '/auth/errors', // Error code passed in query string as ?error=
    error: '/auth/errors', // Error code passed in query string as ?error=
    newUser: '/auth/welcome', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
});
