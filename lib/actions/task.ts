export async function createTask(data: any) {
    const res = await fetch("/api/task", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error?.error || "Failed to create task");
    }
  
    return res.json();
  }
  
  export async function getTasks() {
    const res = await fetch("/api/task");
    return res.json();
  }
  