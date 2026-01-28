import { getPool } from "./pool.js";

export async function usersGetAll() {
  const pool = getPool();
  const { rows } = await pool.query("SELECT id, name FROM users ORDER BY id DESC");
  return rows;
}

export async function usersAdd(name: string) {
  const pool = getPool();
  const { rows } = await pool.query(
    "INSERT INTO users (name) VALUES ($1) RETURNING id, name",
    [name]
  );
  return rows[0];
}