import bcrypt from "bcryptjs";
import { getPool } from "./pool.js";
import crypto from "crypto";

function makeToken() {
  return crypto.randomBytes(32).toString("hex");
}

type DbUser = {
  id: number;
  email: string;
  name: string;
  password_hash: string;
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function authRegister(
  name: string,
  email: string,
  password: string,
) {
  const pool = getPool();
  const normalizedEmail = normalizeEmail(email);

  const existing = await pool.query("SELECT id FROM users WHERE email = $1", [
    normalizedEmail,
  ]);

  if (existing.rowCount && existing.rowCount > 0) {
    return { ok: false as const, error: "Email already in use." };
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const { rows } = await pool.query(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, name, email`,
    [name, normalizedEmail, passwordHash],
  );

  return { ok: true as const, user: rows[0] };
}

export async function authLogin(email: string, password: string) {
  const pool = getPool();
  const normalizedEmail = normalizeEmail(email);

  const { rows } = await pool.query<DbUser>(
    `SELECT id, name, email, password_hash
     FROM users
     WHERE email = $1`,
    [normalizedEmail],
  );

  const user = rows[0];
  if (!user) {
    return { ok: false as const, error: "Invalid email or password." };
  }

  const matches = await bcrypt.compare(password, user.password_hash || "");
  if (!matches) {
    return { ok: false as const, error: "Invalid email or password." };
  }

  const token = makeToken();

  await pool.query(`INSERT INTO sessions (token, user_id) VALUES ($1, $2)`, [
    token,
    user.id,
  ]);

  return {
    ok: true as const,
    user: { id: user.id, name: user.name, email: user.email },
    token,
  };
}

const SESSION_TTL_MINUTES = 30;

export async function authMe(token: string) {
  const pool = getPool();

  const { rows } = await pool.query(
    `
    WITH updated AS (
      UPDATE sessions
      SET last_seen_at = NOW()
      WHERE token = $1
        AND last_seen_at >= NOW() - INTERVAL '${SESSION_TTL_MINUTES} minutes'
      RETURNING user_id
    )
    SELECT u.id, u.name, u.email
    FROM updated
    JOIN users u ON u.id = updated.user_id
    `,
    [token]
  );

  if (rows.length === 0) {
    await pool.query(
      `DELETE FROM sessions
       WHERE token = $1
         AND last_seen_at < NOW() - INTERVAL '${SESSION_TTL_MINUTES} minutes'`,
      [token]
    );

    return { ok: false as const, error: "Session expired." };
  }

  return { ok: true as const, user: rows[0] };
}

export async function authLogout(token: string) {
  const pool = getPool();
  await pool.query(`DELETE FROM sessions WHERE token = $1`, [token]);
  return { ok: true as const };
}
