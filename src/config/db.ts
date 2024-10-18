import { drizzle } from 'drizzle-orm/node-postgres';
import { POSTGRES_URL } from './enviroments.config';
import { Pool } from 'pg';
import * as schema from '../../db/schemas/schema';

const pool = new Pool({ connectionString: POSTGRES_URL });
export const db = drizzle(pool, { schema });
