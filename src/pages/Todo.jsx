import TodoWrapperComponent from "../components/TodoWrapperComponent";
import { GetTodoListAPI } from "../utils/GoServiceTodo";
import { useState, useEffect, useContext } from "react";
import LoadingDots from "../components/TodoLoader";
import AppContext from "../utils/Context";

const Todo = () => {
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(AppContext);

  useEffect(() => {
    if (!context?.isLoggedIn || !context?.userContext?.id) return;

    const fetchTodoList = async () => {
      setIsLoading(true);
      const startTime = Date.now();
      try {
        const data = await GetTodoListAPI(context?.userContext.id);
        if (data) {
          const { id, tasks } = data;
          context?.setListId(id);
          context?.setTodoList(tasks);
        }
      } catch (error) {
        console.log("Todo List Fetch failed:", error);
      } finally {
        const elapsed = Date.now() - startTime;
        const minDelay = 500; // 0.5s minimum
        const remaining = Math.max(0, minDelay - elapsed);

        setTimeout(() => setIsLoading(false), remaining);
      }
    };

    fetchTodoList();
  }, [context?.isLoggedIn, context?.userContext?.id, context?.setTodoList]);
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
      <TodoWrapperComponent />
    </>
  );
};

export default Todo;
