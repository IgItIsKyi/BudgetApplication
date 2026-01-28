import path from "path";
import { app, BrowserWindow, ipcMain } from "electron";
import dotenv from "dotenv";
import { getPool } from "./db/pool.js";
import { usersGetAll, usersAdd } from "./db/users.js";

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
  const startURL = isDev
    ? "http://localhost:5123"
    : `file://${prodIndex}`;

  mainWindow.loadURL(startURL);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

ipcMain.handle("users:getAll", async () => {
  try {
    const res = await usersGetAll();
    return res;
  } catch (err: any) {
    console.error("ERROR: IPC users:getAll failed:");
    console.error(err);
    if (err?.errors) console.error("Inner errors:", err.errors);
    throw err;
  }
});

ipcMain.handle("users:add", async (_event, name: string) => {
  try {
    const res = await usersAdd(name);
    return res;
  } catch (err: any) {
    console.error("ERROR: IPC users:add failed:");
    console.error(err);
    if (err?.errors) console.error("Inner errors:", err.errors);
    throw err;
  }
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

app.whenReady().then(async () => {
  createWindow();
  try {
    await testDbConnection();
  } catch (err) {
    console.error("ERROR: Postgres connection failed:", err);
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});