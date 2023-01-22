import { DateTimeResolver } from 'graphql-scalars';
import { GraphQLScalarType } from 'graphql/type';
import { asNexusMethod } from 'nexus';

// 本当はNexusPrismaScalarsをmakeSchemaで読んで使いたい
export const dateTimeScalar = asNexusMethod(new GraphQLScalarType(DateTimeResolver), 'dateTime');
