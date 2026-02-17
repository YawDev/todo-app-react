import HeaderComponent from "./HeaderComponent";
import TodoItemSection from "./TodoItemSection";
import DeleteConfirmationModalCompononent from "./DeleteConfirmationComponent";
import { useState, useEffect, useContext } from "react";
import PaginationComponent from "./Pagination";
import SaveItemModalCompononent from "./SaveItemModalCompononent";

import {
  UpdateTaskAPI,
  DeleteTaskAPI,
  GetTodoListAPI,
  CreateListAPI,
  UpdateTaskStatusAPI,
} from "../utils/GoServiceTodo";
import AppContext from "../utils/Context";

export default function TodoWrapperComponent() {
  const [checkedBoxes, setCheckedBoxes] = useState({
    filterComplete: false,
    filterIncomplete: false,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const [editMode, setEditMode] = useState({ taskToEdit: null, isOn: false });
  const [showEditModal, setShowEditModal] = useState(false);

  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    itemsPerPage: 4,
  });

  const context = useContext(AppContext);
  const { setTodoList, setListId, listId, userContext, todoList, isLoggedIn } =
    context;

  const filteredTodoList = todoList?.filter((todo) => {
    if (
      searchTerm &&
      !todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;

    if (checkedBoxes.filterComplete && !todo.isCompleted) return false;

    if (checkedBoxes.filterIncomplete && todo.isCompleted) return false;

    return true;
  });

  const { currentPage, itemsPerPage } = paginationData;

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
      lastItemIndex,
    );

    if (currentPageItemsAfterDelete.length === 0 && currentPage > 1) {
      setPaginationData((prev) => ({
        ...prev,
        currentPage: prev.currentPage - 1,
      }));
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
    setEditMode((prev) => ({ ...prev, taskToEdit: null, isOn: false }));
  };

  const handleEditRequest = (task) => {
    setEditMode((prev) => ({ ...prev, taskToEdit: task, isOn: true }));

    setShowEditModal(true);
    console.log("task", task);
  };

  const handleEditSubmit = async (title, description) => {
    const apiResult = await UpdateTaskAPI(editMode?.taskToEdit?.id, {
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
    setPaginationData((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleTaskStatusRequest = async (e, task) => {
    const { name, checked } = e.target;

    const apiResult = await UpdateTaskStatusAPI(task.id, {
      isCompleted: checked,
    });
    const data = await GetTodoListAPI(userContext.id);

    if (!data) {
      alert("Session expired or server down. Redirecting to login...");
      window.location.href = "/login";
      return;
    }
    const { tasks } = data;
    setTodoList(tasks);
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
          handleTaskStatusRequest={handleTaskStatusRequest}
          searchTerm={searchTerm}
          setCheckedBoxes={setCheckedBoxes}
          checkedBoxes={checkedBoxes}
        />
        <PaginationComponent
          totalItems={filteredTodoList.length}
          paginationData={paginationData}
          setPaginationData={setPaginationData}
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
          editMode={editMode}
        />
      </div>
    ) : (
      <>
        {/* <h1> Lets get started on tracking your productivity.</h1>
        <button className="createNewListBtn" onClick={handleAddNewList}>
          Create New List
        </button> */}
      </>
    )
  ) : (
    <h1>Login To View Todo</h1>
  );
}
