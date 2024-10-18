import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schemas/schema';
import { POSTGRES_URL } from '../src/config/enviroments.config';

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

if (!POSTGRES_URL) throw new Error('POSTGRES_URL is not defined');

const conn = globalForDb.conn ?? postgres(POSTGRES_URL);
if (process.env.NODE_ENV !== 'production') globalForDb.conn = conn;

export const db = drizzle(conn, { schema });
