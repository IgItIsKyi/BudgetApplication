// client/src/api/users.ts
export async function getUsers() {
  try {
    return await window.api.getUsers();
  } catch (err) {
    console.error("Failed to fetch users:", err);
    return [];
  }
}

export async function getUserById(id: number) {
  try {
    return await window.api.getUserById(id);
  } catch (err) {
    console.error("Failed to fetch user:", err);
    return null;
  }
}


