import { PrismaClient } from '@prisma/client';
import { enumType, extendType, nonNull, objectType } from 'nexus';
import { User as PrismaUser, UserProfile as PrismaUserProfile, Prefecture, Gender } from 'nexus-prisma';
import { NexusGenRootTypes } from 'graphql/generated/nexus/types';

export const prefecture = enumType(Prefecture);
export const gender = enumType(Gender);

export const UserProfile = objectType({
  name: PrismaUserProfile.$name,
  definition(t) {
    t.field(PrismaUserProfile.introduction);
    t.field(PrismaUserProfile.birthdate);
    t.field(PrismaUserProfile.gender);
    t.field(PrismaUserProfile.prefecture);
  },
});

export const User = objectType({
  name: PrismaUser.$name,
  definition(t) {
    t.nonNull.field(PrismaUser.id);
    t.field(PrismaUser.name);
    t.field(PrismaUser.email);
    t.field(PrismaUser.image);
    t.field(PrismaUser.profile.name, {
      type: PrismaUser.profile.type,
    });
  },
});

export const userQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('user', {
      type: User,
      args: { id: nonNull('String') },
      resolve(_, args, ctx) {
        return myProfileLoader(ctx.prisma, args.id);
      },
    });
  },
});

export const myProfileLoader = async (prisma: PrismaClient, id: string): Promise<NexusGenRootTypes['User'] | null> => {
  return prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
    },
  });
};
