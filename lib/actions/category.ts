export async function createCategory(data: any) {
    const res = await fetch("/api/category", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error?.error || "Failed to create category");
    }
  
    return res.json();
  }
  
  export async function getCategories() {
    const res = await fetch("/api/category");
    return res.json();
  }
  