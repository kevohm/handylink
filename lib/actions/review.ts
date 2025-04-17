export async function createReview(data: any) {
    const res = await fetch("/api/review", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error?.error || "Failed to create review");
    }
  
    return res.json();
  }
  
  export async function getReviews(taskId: string) {
    const res = await fetch(`/api/review?taskId=${taskId}`);
    return res.json();
  }
  