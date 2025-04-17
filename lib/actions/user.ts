export async function createUser(data: any) {
    const res = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error?.error || "Failed to create user");
    }
  
    return res.json();
  }
  
  export async function getUsers() {
    const res = await fetch("/api/user");
    return res.json();
  }
  