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
    return await response.json();
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function RegisterAPI(user) {
  try {
    const response = await fetch("http://localhost:8080/api/v1/Register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
}

export async function LogoutAPI() {
  try {
    const response = await fetch("http://localhost:8080/api/v1/Logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Logout failed");
    }
    return await response.json();
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}

export async function AuthStatusAPI() {
  try {
    const response = await fetch("http://localhost:8080/api/v1/AuthStatus", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const result = await response.json();
      console.log(result);
      return { Authenticated: false };
    }
    const result = await response.json();
    console.log(result);
    return { Authenticated: true, result };
  } catch (error) {
    console.error("Fetch Auth Status error:", error);
    throw error;
  }
}
