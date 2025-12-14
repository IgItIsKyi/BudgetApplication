export async function getUsers() {
  const res = await fetch("http://localhost:3000/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}
