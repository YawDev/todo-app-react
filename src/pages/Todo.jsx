import TodoWrapperComponent from "../components/TodoWrapperComponent";
import { GetTodoListAPI } from "../utils/GoServiceTodo";
import { useState, useEffect } from "react";
import LoadingDots from "../components/TodoLoader";

const Todo = ({
  todoList,
  setTodoList,
  listId,
  setListId,
  isLoggedIn,
  userContext,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn || !userContext?.id) return;

    const fetchTodoList = async () => {
      setIsLoading(true);
      const startTime = Date.now();
      try {
        const data = await GetTodoListAPI(userContext.id);
        if (data) {
          const { id, tasks } = data;
          setListId(id);
          setTodoList(tasks);
        }
      } catch (error) {
        console.log("Todo List Fetch failed:", error);
      } finally {
        const elapsed = Date.now() - startTime;
        const minDelay = 1800; // 0.5s minimum
        const remaining = Math.max(0, minDelay - elapsed);

        setTimeout(() => setIsLoading(false), remaining);
      }
    };

    fetchTodoList();
  }, [isLoggedIn, userContext?.id, setTodoList]);
  return isLoading ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "160px",
      }}
    >
      <LoadingDots />
      <p style={{ marginTop: "12px", fontSize: "16px", fontWeight: "500" }}></p>
    </div>
  ) : (
    <>
      <TodoWrapperComponent
        todoList={todoList}
        setTodoList={setTodoList}
        listId={listId}
        isLoggedIn={isLoggedIn}
        userContext={userContext}
        setListId={setListId}
      />
    </>
  );
};

export default Todo;
