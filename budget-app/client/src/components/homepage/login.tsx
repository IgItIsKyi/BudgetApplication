import { FormEvent, useState } from "react";

type User = { id: number; name: string; email: string };

type LoginProps = {
  onSuccess: (payload: {
    user: { id: number; name: string; email: string };
    token: string;
  }) => void;
};

function Login({ onSuccess }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await window.api.auth.login(email, password);

      if (!res.ok) {
        setError(res.error);
        return;
      }

      if (res.ok) {
        onSuccess({ user: res.user, token: res.token });
      }

    } catch (err) {
      setError("ERROR");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login to account</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button type="submit" disabled={loading}>
        {loading ? "Checking..." : "Login"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default Login;
