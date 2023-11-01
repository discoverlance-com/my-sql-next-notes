import { sql } from "@vercel/postgres";

async function seedDatabase() {
  const createTable = await sql`
        CREATE TABLE IF NOT EXISTS notes {
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            slug VARCHAR(255) UNIQUE NOT NULL,
            description TEXT,
            "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
            ON UPDATE CURRENT_TIMESTAMP
        }
    `;

  console.log(`Created "notes" table`);

  return { createTable };
}
