import { useEffect, useState } from "react";
import { getUsers } from "../../api/users";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    getUsers().then(setUsers).catch(console.error);
  }, []);

  return (
    <div>
      <h2>Users</h2>

      <ul>
        {users.map((u: any) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>      
    </div>

  );
}
