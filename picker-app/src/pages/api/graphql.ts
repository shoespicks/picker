import { NextApiRequest, NextApiResponse } from 'next';
import { ApolloServer } from 'apollo-server-micro';
import { Resolvers } from 'graphql/generated/codegen-server';
import { schemas } from 'graphql/schemas';

// スキーマと実際のデータ構造の紐付けを resolvers で行う
const resolvers: Resolvers = {
  Query: {
    spikes: (_, args) => [
      { id: '1', name: '黒のインクス' + args.input?.keyword },
      { id: '2', name: '黒のディスト' + args.input?.keyword },
    ], // Type Error
  },
};

const apolloServer = new ApolloServer({ typeDefs: schemas, resolvers });

const startServer = apolloServer.start();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
