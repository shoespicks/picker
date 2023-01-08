import path from 'path';
import { makeSchema } from 'nexus';
import NexusPrismaScalars from 'nexus-prisma/scalars';
import * as nexusDefs from './schema';

export const schema = makeSchema({
  types: [nexusDefs, NexusPrismaScalars],
  contextType: {
    module: path.join(process.cwd(), 'src/graphql/context.ts'),
    export: 'Context',
  },
  outputs: {
    schema: path.join(process.cwd(), 'src/graphql/generated/nexus/schema.graphqls'),
    typegen: path.join(process.cwd(), 'src/graphql/generated/nexus/types.ts'),
  },
  features: {
    abstractTypeStrategies: {
      resolveType: false,
    },
  },
  prettierConfig: path.join(process.cwd(), '../.prettierrc'),
});
