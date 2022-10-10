import { NextApiRequest, NextApiResponse } from 'next';
import { ApolloServer } from 'apollo-server-micro';
import { schema } from 'graphql/nexus-schema';

// スキーマと実際のデータ構造の紐付けを resolvers で行う
// const resolvers: Resolvers = {
//   Query: {
//     spikes: (_, args) => [
//       { id: '1', name: '黒のインクス' + args.input?.keyword },
//       { id: '2', name: '黒のディスト' + args.input?.keyword },
//     ], // Type Error
//   },
// };

const apolloServer = new ApolloServer({ schema });
const startServer = apolloServer.start();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

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
