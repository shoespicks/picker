import path from 'path';
import { makeSchema } from 'nexus';
import * as nexusDefs from './server';

export const schema = makeSchema({
  types: nexusDefs,
  outputs: {
    schema: path.join(process.cwd(), 'src/graphql/generated/nexus/schema.graphqls'),
    typegen: path.join(process.cwd(), 'src/graphql/generated/nexus/types.ts'),
  },
  features: {
    abstractTypeStrategies: {
      resolveType: false,
    },
  },
});
