import HeaderComponent from "./HeaderComponent";
import TodoItemSection from "./TodoItemSection";
import DeleteConfirmationModalCompononent from "./DeleteConfirmationComponent";
import { useState } from "react";

export default function TodoWrapperComponent({ todoList, setTodoList }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const confirmDelete = () => {
    const updatedTodoList = todoList.filter(
      (task) => task.id !== taskToDelete.id
    );
    setTodoList(updatedTodoList);
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

  const handleDeleteRequest = (task) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };
  return (
    <div className="todo-container">
      <h1 className="wrapperTitle"> Todo List</h1>
      <HeaderComponent todoList={todoList} setTodoList={setTodoList} />
      <TodoItemSection
        todoList={todoList}
        handleDeleteRequest={handleDeleteRequest}
      />
      <DeleteConfirmationModalCompononent
        show={showDeleteModal}
        handleClose={cancelDelete}
        handleConfirmDelete={confirmDelete}
        taskToDelete={taskToDelete}
      />
    </div>
  );
}
