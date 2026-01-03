import { Pool } from "pg";


console.log("PGPORT from env:", process.env.PGPORT);
console.log("Number(PGPORT):", Number(process.env.PGPORT));


// Create a single pool instance for the app to reuse
export const pool = new Pool({
  host: process.env.PGHOST || "localhost",    // Use env or fallback
  port: Number(process.env.PGPORT) || 5432,   // Ensure port is number
  user: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD || "",
  database: process.env.PGDATABASE || "postgres",
});


export async function getUsers() {
  const { rows } = await pool.query("SELECT name FROM users");
  return rows;
}


// Optional: handle pool errors globally
pool.on("error", (err) => {
  console.error("Unexpected error on idle PostgreSQL client", err);
  process.exit(-1);
});
