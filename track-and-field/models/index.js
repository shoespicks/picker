// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { USER1 } = initSchema(schema);

export {
  USER1
};