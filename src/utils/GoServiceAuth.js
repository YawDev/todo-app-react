export async function LoginAPI(user) {
  try {
    const response = await fetch("http://localhost:8080/api/v1/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }
    return await response.json();
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
