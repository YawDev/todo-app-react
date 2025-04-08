import HeaderComponent from "./HeaderComponent";
import TodoItemSection from "./TodoItemSection";
import DeleteConfirmationModalCompononent from "./DeleteConfirmationComponent";
import { useState } from "react";
import PaginationComponent from "./Pagination";
import SaveItemModalCompononent from "./SaveItemModalCompononent";

export default function TodoWrapperComponent({ todoList, setTodoList }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const filteredTodoList = todoList.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentData = filteredTodoList.slice(firstItemIndex, lastItemIndex);

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

  const handleClose = () => {
    setShowEditModal(false);
    setIsEditMode(false);
    setTaskToEdit(null);
  };

  const handleEditRequest = (task) => {
    setTaskToEdit(task);
    setIsEditMode(true);
    setShowEditModal(true);
    console.log("task", task);
  };

  const handleEditSubmit = (title, description) => {
    setTodoList(
      todoList.map((task) =>
        task.id === taskToEdit.id
          ? { ...task, title: title, description: description }
          : task
      )
    );

    handleClose();
  };

  const handleQueryChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="todo-container">
      <h1 className="wrapperTitle"> Todo List</h1>
      <HeaderComponent
        todoList={todoList}
        setTodoList={setTodoList}
        handleQueryChange={handleQueryChange}
        searchTerm={searchTerm}
      />
      <TodoItemSection
        todoList={currentData}
        handleDeleteRequest={handleDeleteRequest}
        handleEditRequest={handleEditRequest}
        searchTerm={searchTerm}
      />
      <PaginationComponent
        totalItems={filteredTodoList.length}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      <DeleteConfirmationModalCompononent
        show={showDeleteModal}
        handleClose={cancelDelete}
        handleConfirmDelete={confirmDelete}
        taskToDelete={taskToDelete}
      />
      <SaveItemModalCompononent
        show={showEditModal}
        handleClose={handleClose}
        handleSubmit={handleEditSubmit}
        isEditMode={isEditMode}
        taskToEdit={taskToEdit}
      />
    </div>
  );
}
