export async function createBooking(data: any) {
    const res = await fetch("/api/booking", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error?.error || "Failed to create booking");
    }
  
    return res.json();
  }
  
  export async function getBookings(userId?: string) {
    const url = userId ? `/api/booking?userId=${userId}` : "/api/booking";
    const res = await fetch(url);
    return res.json();
  }
  