import path from 'path';
import { makeSchema } from 'nexus';
import * as nexusDefs from './nexus';

export const schema = makeSchema({
  types: [nexusDefs], // NexusPrismaScalarsをここで読むとエラーになるのでscalar.tsで読み込んでいる
  contextType: {
    module: path.join(process.cwd(), 'src/api/graphql/context.ts'),
    export: 'Context',
  },
  outputs: {
    schema: path.join(process.cwd(), 'src/api/graphql/generated/nexus/schema.graphqls'),
    typegen: path.join(process.cwd(), 'src/api/graphql/generated/nexus/types.ts'),
  },
  features: {
    abstractTypeStrategies: {
      resolveType: false,
    },
  },
  prettierConfig: path.join(process.cwd(), '../.prettierrc'),
});
