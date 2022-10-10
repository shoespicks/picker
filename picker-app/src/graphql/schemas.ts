import { readFileSync } from 'fs';
import { resolve } from 'path';
import { sync } from 'glob';

function loadSchemas() {
  const files = sync('src/graphql/schemas/*.graphqls');
  return files.map(file => readFileSync(resolve(file), { encoding: 'utf8' }));
}

export const schemas = loadSchemas();
