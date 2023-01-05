import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';

const prisma = new PrismaClient();
export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    TwitterProvider({
      clientId: process.env.PICKER_TWITTER_CLIENT_ID || '',
      clientSecret: process.env.PICKER_TWITTER_CLIENT_SECRET || '',
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user, account, profile, isNewUser }) {
  //     return token;
  //   },
  // },
});
