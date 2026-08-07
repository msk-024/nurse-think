import path from "node:path";
import { defineConfig } from "prisma/config";

try {
  process.loadEnvFile(path.join(import.meta.dirname, ".env"));
} catch {}

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  migrations: {
    path: path.join("prisma", "migrations"),
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "",
  },
});
