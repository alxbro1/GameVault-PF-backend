
import { POSTGRES_URL } from "./src/config/enviroments.config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: './db/schemas',
  out: './db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: POSTGRES_URL!,
  },
});