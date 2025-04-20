import TodoWrapperComponent from "../components/TodoWrapperComponent";
import { GetTodoListAPI } from "../utils/GoServiceTodo";
import { useState, useEffect } from "react";

const Todo = ({ todoList, setTodoList, isLoggedIn, userContext }) => {
  useEffect(() => {
    if (!isLoggedIn || !userContext?.id) return;

    const fetchTodoList = async () => {
      try {
        const data = await GetTodoListAPI(userContext.id);
        if (data) {
          const { tasks } = data;
          setTodoList(tasks);
        }
      } catch (error) {
        console.error("Todo List Fetch failed:", error);
      }
    };

    fetchTodoList();
  }, [isLoggedIn, userContext?.id, setTodoList]);

  return (
    <TodoWrapperComponent
      todoList={todoList}
      setTodoList={setTodoList}
      isLoggedIn={isLoggedIn}
      userContext={userContext}
    />
  );
};

export default Todo;
