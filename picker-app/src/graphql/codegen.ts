import type { CodegenConfig } from '@graphql-codegen/cli';

const codegen: CodegenConfig = {
  schema: './src/graphql/schemas/*.graphqls',
  documents: './src/graphql/client/*.graphql',
  generates: {
    './src/graphql/generated/codegen-server.ts': {
      config: {
        useIndexSignature: true,
        immutableTypes: true,
        enumsAsConst: true,
        skipTypename: true,
      },
      plugins: ['typescript', 'typescript-resolvers'],
      hooks: {
        afterAllFileWrite: 'prettier --write',
      },
    },
    './src/graphql/generated/codegen-client.ts': {
      config: {
        useIndexSignature: true,
        immutableTypes: true,
        enumsAsConst: true,
        skipTypename: true,
        fetcher: {
          func: 'graphql/custom-fetcher#useFetchData',
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
