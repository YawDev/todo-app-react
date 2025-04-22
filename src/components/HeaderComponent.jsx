import ButtonComponent from "./ButtonComponent";
import React, { useState } from "react";
import SaveItemModalCompononent from "./SaveItemModalCompononent";
import { GetTodoListAPI, AddTaskToListAPI } from "../utils/GoServiceTodo";

export default function HeaderComponent({
  setTodoList,
  listId,
  userContext,
  handleQueryChange,
}) {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };
  const handleShow = (task = null) => {
    setShowModal(true);
  };

  const handleSubmit = async (title, description) => {
    const createTask = async () => {
      try {
        var task = { title, description };
        var data = await AddTaskToListAPI(listId, task);
        console.log(data);
      } catch (error) {
        console.log("Error while creating task.", error);
      }
    };

    const fetchList = async () => {
      try {
        var data = await GetTodoListAPI(userContext.id);
        if (data) {
          const { id, tasks } = data;
          setTodoList(tasks);
        }
        console.log(data);
      } catch (error) {
        console.log("Error while fetching updated todo list.", error);
      }
    };

    await createTask();
    await fetchList();
    handleClose();
  };

  const handleAddBtnClick = (e) => {
    e.preventDefault();
    handleShow();
  };

  return (
    <div className="header-section">
      <input
        type="text"
        name="inputBox"
        className="inputBox"
        onChange={handleQueryChange}
        placeholder="Filter tasks"
      />
      <ButtonComponent btn="add-btn" onAction={handleAddBtnClick}>
        New Task
      </ButtonComponent>
      <SaveItemModalCompononent
        show={showModal}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        isEditMode={false}
        taskToEdit={null}
      />
    </div>
  );
}
