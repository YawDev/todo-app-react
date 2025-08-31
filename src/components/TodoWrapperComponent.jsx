import HeaderComponent from "./HeaderComponent";
import TodoItemSection from "./TodoItemSection";
import DeleteConfirmationModalCompononent from "./DeleteConfirmationComponent";
import { useState, useEffect } from "react";
import PaginationComponent from "./Pagination";
import SaveItemModalCompononent from "./SaveItemModalCompononent";

import {
  UpdateTaskAPI,
  DeleteTaskAPI,
  GetTodoListAPI,
  CreateListAPI,
} from "../utils/GoServiceTodo";

export default function TodoWrapperComponent({
  todoList,
  setTodoList,
  listId,
  isLoggedIn,
  userContext,
  setListId,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const filteredTodoList = todoList?.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentData = filteredTodoList?.slice(firstItemIndex, lastItemIndex);

  const confirmDelete = async () => {
    const result = await DeleteTaskAPI(taskToDelete.id);

    const data = await GetTodoListAPI(userContext.id);

    if (!data || !result) {
      alert("Session expired or server down. Redirecting to login...");
      window.location.href = "/login";
      return;
    }

    const { id, tasks } = data;

    const updatedTodoList = tasks;
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

  const handleEditSubmit = async (title, description) => {
    const apiResult = await UpdateTaskAPI(taskToEdit.id, {
      title,
      description,
    });
    const data = await GetTodoListAPI(userContext.id);

    if (!data) {
      alert("Session expired or server down. Redirecting to login...");
      window.location.href = "/login";
      return;
    }
    const { id, tasks } = data;
    setTodoList(tasks);

    handleClose();
  };

  const handleAddNewList = async () => {
    const createList = async () => {
      try {
        const data = await CreateListAPI(userContext.id);

        if (data) {
          return;
        }
      } catch (error) {
        console.log("Error while fetching creating todo list.", error);
      }
    };

    const fetchTodo = async () => {
      try {
        const data = await GetTodoListAPI(userContext.id);

        if (data) {
          const { id, tasks } = data;

          const newTodoList = tasks;
          setTodoList(newTodoList);
          setListId(id);
          return;
        }
      } catch (error) {
        console.log("Error while fetching creating todo list.", error);
      }
    };

    await createList();
    await fetchTodo();
  };

  const handleQueryChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    setSearchTerm("");
  }, [todoList]);

  return isLoggedIn ? (
    todoList ? (
      <div className="todo-container">
        <h1 className="wrapperTitle">Tasks</h1>

        <h1 className="todo-title">Let’s help you stay productive 🗒️</h1>

        <HeaderComponent
          setTodoList={setTodoList}
          listId={listId}
          userContext={userContext}
          handleQueryChange={handleQueryChange}
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
    ) : (
      <>
        <h1> Lets get started on tracking your productivity.</h1>
        <button className="createNewListBtn" onClick={handleAddNewList}>
          Create New List
        </button>
      </>
    )
  ) : (
    <h1>Login To View Todo</h1>
  );
}
