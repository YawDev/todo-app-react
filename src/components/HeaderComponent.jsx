import ButtonComponent from "./ButtonComponent";
import React, { useState, useEffect } from "react";
import SaveItemModalCompononent from "./SaveItemModalCompononent";
import { v4 as uuidv4 } from "uuid";

export default function HeaderComponent({ todoList, setTodoList }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log(todoList); // Log todoList when it changes
  }, [todoList]);

  const handleClose = () => {
    setShowModal(false);
  };
  const handleShow = (task = null) => {
    setShowModal(true);
  };

  const handleSubmit = (title, description) => {
    setTodoList([
      ...todoList,
      {
        id: uuidv4(),
        title: title,
        description: description,
        isCompleted: false,
      },
    ]);
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
