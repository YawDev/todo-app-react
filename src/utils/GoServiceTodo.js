export async function GetTodoListAPI(Id) {
  try {
    const response = await fetch(`http://localhost:8080/api/v1/GetList/${Id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Fetch for GetTodoListById failed:", error);
    throw error;
  }
}
