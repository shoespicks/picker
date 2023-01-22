import { PrismaClient } from '@prisma/client';
import { arg, enumType, extendType, inputObjectType, mutationField, nonNull, objectType } from 'nexus';
import { User, UserProfile, PrefectureEnum, GenderEnum } from 'nexus-prisma';
import { NexusGenInputs, NexusGenRootTypes } from '../../generated/nexus/types';

export const Prefecture = enumType(PrefectureEnum);
export const Gender = enumType(GenderEnum);

const userEditableField = <T extends string>(t: any) => {
  t.field(User.name);
  t.field(User.image);
  t.field(User.email);
};

const profileEditableField = (t: any) => {
  t.field(UserProfile.introduction);
  t.nonNull.field(UserProfile.prefecture);
  t.nonNull.field(UserProfile.birthdate);
  t.nonNull.field(UserProfile.gender);
};

export const UserProfileObject = objectType({
  name: UserProfile.$name,
  definition(t) {
    t.nonNull.field(UserProfile.id);
    profileEditableField(t);
  },
});

export const UserObject = objectType({
  name: User.$name,
  definition(t) {
    t.nonNull.field(User.id);
    userEditableField(t);
    t.field(User.profile);
  },
});

export const UpdateUserInput = inputObjectType({
  name: 'UpdateUserInput',
  definition(t) {
    userEditableField(t);
  },
});

export const UpdateProfileInput = inputObjectType({
  name: 'UpdateProfileInput',
  definition(t) {
    profileEditableField(t);
  },
});

export const userQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('userProfile', {
      type: UserObject,
      args: { id: nonNull('String') },
      resolve(_, args, ctx) {
        return userProfileLoader(ctx.prisma, args.id);
      },
    });
  },
});

export const updateUserProfile = mutationField('updateUserProfile', {
  type: 'Boolean',
  args: {
    id: nonNull(arg({ type: 'String' })),
    userInput: nonNull(arg({ type: UpdateUserInput })),
    profileInput: nonNull(arg({ type: UpdateProfileInput })),
  },
  resolve(_, args, ctx) {
    return updateUserProfileLoader(ctx.prisma, args.id, args.userInput, args.profileInput);
  },
});

// TODO 自分のプロフィールの場合のみの項目は返さないようにする
export const userProfileLoader = async (
  prisma: PrismaClient,
  id: string
): Promise<NexusGenRootTypes['User'] | null> => {
  return prisma.user
    .findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
      },
    })
    .then(user => {
      if (!user) {
        return null;
      }

      return {
        ...user,
      };
    });
};
//
export const updateUserProfileLoader = async (
  prisma: PrismaClient,
  id: string,
  userInput: NexusGenInputs['UpdateUserInput'],
  profileInput: NexusGenInputs['UpdateProfileInput']
) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      ...userInput,
      profile: {
        upsert: {
          update: {
            ...profileInput,
          },
          create: {
            ...profileInput,
          },
        },
      },
    },
    include: {
      profile: true,
    },
  });

  return !!user;
};
