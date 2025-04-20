export async function GetTodoListAPI(userID) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/GetList/${userID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("GetList API failed:", error);
    throw error;
  }
}

export async function CreateListAPI(userID) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/CreateList/${userID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("CreateList API failed:", error);
    throw error;
  }
}

export async function AddTaskToListAPI(listID, task) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/CreateTask/${listID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(task),
      }
    );

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("AddTask API failed:", error);
    throw error;
  }
}

export async function UpdateTaskAPI(taskID, task) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/UpdateTask/${taskID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(task),
      }
    );

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("UpdateTask API failed:", error);
    throw error;
  }
}

export async function UpdateTaskStatusAPI(taskID, updateRequest) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/TaskCompleted/${taskID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updateRequest),
      }
    );

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("UpdateTaskStatus API failed:", error);
    throw error;
  }
}

export async function DeleteTaskAPI(taskID) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/DeleteTask/${taskID}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("DeleteTask API failed:", error);
    throw error;
  }
}
