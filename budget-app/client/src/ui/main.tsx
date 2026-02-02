import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Title from "../components/title.tsx";
import Bills from "../components/homepage/bills.tsx";
import Income from "../components/homepage/income.tsx";
import Login from "../components/homepage/login.tsx";
import "./App.css";

type SafeUser = { id: number; name: string; email: string };

function App() {
  const [user, setUser] = useState<SafeUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem("sessionToken");
    if (!t) {
      setCheckingSession(false);
      return;
    }

    setToken(t);

    (async () => {
      try {
        const res = await window.api.auth.me(t);
        if (res.ok) setUser(res.user);
        else {
          localStorage.removeItem("sessionToken");
          setToken(null);
        }
      } finally {
        setCheckingSession(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!token) return;

    const interval = setInterval(
      async () => {
        const res = await window.api.auth.me(token);
        if (!res.ok) {
          localStorage.removeItem("sessionToken");
          setToken(null);
          setUser(null);
        }
      },
      2 * 60 * 1000,
    ); 

    return () => clearInterval(interval);
  }, [token]);

  const handleLoginSuccess = (payload: { user: SafeUser; token: string }) => {
    setUser(payload.user);
    setToken(payload.token);
    localStorage.setItem("sessionToken", payload.token);
  };

  const logout = async () => {
    if (token) await window.api.auth.logout(token);
    localStorage.removeItem("sessionToken");
    setToken(null);
    setUser(null);
  };

  return (
    <>
      <Title />

      {checkingSession ? (
        <p>Loading...</p>
      ) : !user ? (
        <Login onSuccess={handleLoginSuccess} />
      ) : (
        <>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <h3 style={{ margin: 0 }}>Welcome, {user.name}</h3>
            <button onClick={logout}>Logout</button>
          </div>

          <Income />
          <Bills />
        </>
      )}
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
