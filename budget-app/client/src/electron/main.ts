import path from "path";
import { app, BrowserWindow, ipcMain } from "electron";
import dotenv from "dotenv";
// 1️⃣ Load environment variables from project root
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

import { getUsers, pool } from "./db/users.js"; // your Postgres pool
// 2️⃣ Optional: verify DB connection on startup
async function testDbConnection() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ Postgres connected:", res.rows[0]);
  } catch (err) {
    console.error("❌ Postgres connection failed", err);
  }
}

// 3️⃣ Create the Electron BrowserWindow
let mainWindow: BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,      // NEVER enable this
      contextIsolation: true,      // Security
      preload: path.join(__dirname, "preload.js"), // secure bridge
    },
  });

  // Load Vite dev server in dev or your index.html in production
  const startURL = process.env.VITE_DEV_SERVER_URL || `file://${path.join(__dirname, "../../dist/index.html")}`;
  mainWindow.loadURL(startURL);

  mainWindow.on("closed", () => {
    mainWindow = null!;
  });
}

// 4️⃣ IPC handlers for SQL queries

// Example: get all users
ipcMain.handle("users:get", async () => {
  try {
    return getUsers();
  } catch (err) {
    console.error("Error fetching users:", err);
    throw err; // will propagate to renderer
  }
});

// Example: get user by ID
ipcMain.handle("user:getById", async (_event, id: number) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return rows[0] || null;
  } catch (err) {
    console.error("Error fetching user:", err);
    throw err;
  }
});

// 5️⃣ App lifecycle
app.whenReady().then(() => {
  createWindow();
  testDbConnection();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  // On macOS, it is common to keep app running until explicitly quit
  if (process.platform !== "darwin") app.quit();
});
