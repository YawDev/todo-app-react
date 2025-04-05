import ButtonComponent from "./ButtonComponent";
import React, { useState, useEffect } from "react";
import AddModalCompononent from "./AddModalComponent";

export default function HeaderComponent({ todoList, setTodoList }) {
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    console.log(todoList); // Log todoList when it changes
  }, [todoList]);

  const handleClose = () => {
    setShowModal(false);
    setIsEditMode(false);
    setTaskToEdit(null);
  };
  const handleShow = (task = null) => {
    setShowModal(true);
    if (task) {
      setIsEditMode(true); // Edit mode
      setTaskToEdit(task);
    } else {
      setIsEditMode(false); // Add mode
      setTaskToEdit(null);
    }
  };

  const handleSubmit = (title, description) => {
    if (isEditMode && taskToEdit) {
      //
    } else {
      setTodoList([
        ...todoList,
        {
          id: todoList.length + 1,
          title: title,
          description: description,
          isCompleted: false,
        },
      ]);
    }
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
        placeholder="Filter tasks"
      />
      <ButtonComponent btn="add-btn" onAction={handleAddBtnClick}>
        New Task
      </ButtonComponent>
      <AddModalCompononent
        show={showModal}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        isEditMode={isEditMode}
        taskToEdit={taskToEdit}
      />
    </div>
  );
}
