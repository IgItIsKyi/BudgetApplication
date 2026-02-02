import path from "path";
import { app, BrowserWindow, ipcMain } from "electron";
import dotenv from "dotenv";
import { getPool } from "./db/pool.js";
import { authLogin, authRegister, authMe, authLogout } from "./db/auth.js";

dotenv.config();

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.resolve(process.cwd(), "preload.cjs"),
    },
  });

  const isDev = process.env.NODE_ENV === "development";

  const prodIndex = path.resolve(process.cwd(), "client/dist-react/index.html");
  const startURL = isDev ? "http://localhost:5123" : `file://${prodIndex}`;

  mainWindow.loadURL(startURL);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

ipcMain.handle(
  "auth:register",
  async (
    _event,
    payload: { name: string; email: string; password: string },
  ) => {
    try {
      return await authRegister(payload.name, payload.email, payload.password);
    } catch (err: any) {
      console.error("ERROR: IPC auth:register failed:", err);
      return { ok: false, error: "Server error." };
    }
  },
);

ipcMain.handle(
  "auth:login",
  async (_event, payload: { email: string; password: string }) => {
    try {
      return await authLogin(payload.email, payload.password);
    } catch (err: any) {
      console.error("ERROR: IPC auth:login failed:", err);
      return { ok: false, error: "Server error." };
    }
  },
);

ipcMain.handle("auth:me", async (_event, token: string) => {
  return await authMe(token);
});

ipcMain.handle("auth:logout", async (_event, token: string) => {
  return await authLogout(token);
});

async function testDbConnection() {
  try {
    const pool = getPool();
    const res = await pool.query("SELECT NOW()");
    console.log("SUCCESS: Postgres connected:", res.rows[0]);
  } catch (err) {
    console.error("ERROR: Postgres connection failed (detailed):", err);
    throw err;
  }
}

async function cleanupExpiredSessions() {
  const pool = getPool();
  await pool.query(`DELETE FROM sessions WHERE last_seen_at < NOW() - INTERVAL '30 minutes'`);
}

app.whenReady().then(async () => {
  createWindow();
  await testDbConnection();

  setInterval(() => {
    cleanupExpiredSessions().catch(console.error);
  }, 10 * 60 * 1000);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});