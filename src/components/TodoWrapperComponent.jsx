import HeaderComponent from "./HeaderComponent";
import TodoItemSection from "./TodoItemSection";
import DeleteConfirmationModalCompononent from "./DeleteConfirmationComponent";
import { useState } from "react";
import PaginationComponent from "./Pagination";

export default function TodoWrapperComponent({ todoList, setTodoList }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentData = todoList.slice(firstItemIndex, lastItemIndex);

  const confirmDelete = () => {
    const updatedTodoList = todoList.filter(
      (task) => task.id !== taskToDelete.id
    );
    setTodoList(updatedTodoList);

    const currentPageItemsAfterDelete = updatedTodoList.slice(
      firstItemIndex,
      lastItemIndex
    );

    if (currentPageItemsAfterDelete.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
        todoList={currentData}
        handleDeleteRequest={handleDeleteRequest}
      />
      <PaginationComponent
        totalItems={todoList.length}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
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
