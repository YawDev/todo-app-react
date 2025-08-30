import TodoWrapperComponent from "../components/TodoWrapperComponent";
import { GetTodoListAPI } from "../utils/GoServiceTodo";
import { useState, useEffect } from "react";

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
        setIsLoading(false);
      }
    };

    fetchTodoList();
  }, [isLoggedIn, userContext?.id, setTodoList]);
  return isLoading ? (
    <div>Loading your todo list...</div>
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
