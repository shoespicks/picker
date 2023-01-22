import type { CodegenConfig } from '@graphql-codegen/cli';

const codegen: CodegenConfig = {
  schema: './src/api/graphql/generated/nexus/schema.graphqls',
  documents: './src/api/graphql/client/*.graphql',
  generates: {
    './src/api/graphql/generated/codegen-client.ts': {
      config: {
        useIndexSignature: true,
        immutableTypes: true,
        enumsAsConst: true,
        fetcher: {
          func: 'api/graphql/custom-fetcher#useFetchData',
          isReactHook: true,
        },
      },
      plugins: ['typescript', 'typescript-operations', 'typescript-react-query'],
      hooks: {
        afterAllFileWrite: 'prettier --write',
      },
    },
  },
};

export default codegen;
