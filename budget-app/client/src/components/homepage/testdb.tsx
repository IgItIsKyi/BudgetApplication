import { useEffect, useState } from "react";

export default function App() {
  const [users, setUsers] = useState<Array<{ id: number; name: string }>>([]);
  const [name, setName] = useState("");

  async function refresh() {
    setUsers(await window.api.users.getAll());
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div>
      <h1>Users</h1>

      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button
        onClick={async () => {
          console.log("Adding user:", name);
          try {
            const result = await window.api.users.add(name);
            console.log("Added result:", result);
            await refresh();
          } catch (err) {
            console.error("ADD FAILED:", err);
          }
        }}
      >
        Add
      </button>

      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}
