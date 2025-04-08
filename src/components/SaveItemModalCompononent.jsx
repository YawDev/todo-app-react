import { Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";

const Validate = (title) => {
  if (!title || !title.trim()) {
    return false;
  }
  return true;
};

export default function SaveItemModalCompononent({
  show,
  handleClose,
  handleSubmit,
  isEditMode,
  taskToEdit,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [IsValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!show) {
      setTitle("");
      setDescription("");
      setIsValid(false);
      setErrorMessage("");
    } else if (isEditMode && taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || "");
      setIsValid(Validate(taskToEdit.title));
    }
  }, [show, isEditMode, taskToEdit]);

  const titleOnChange = (e) => {
    const input = e.target.value;
    setTitle(input);
    if (!input.trim()) {
      setErrorMessage("Title is required");
      setIsValid(false);
    } else {
      setErrorMessage("");
      setIsValid(Validate(input));
    }
  };

  const descriptionOnChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmitModal = (e) => {
    e.preventDefault();
    if (isEditMode && Validate(title)) {
      handleSubmit(title, description, isEditMode, taskToEdit);
    } else if (Validate(title)) {
      handleSubmit(title, description, false, null);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditMode ? "Edit Task" : "Add New Task"}</Modal.Title>
      </Modal.Header>
      <form className="mt-4" onSubmit={handleSubmitModal}>
        <label htmlFor="Title">Title</label>

        <div className="mb-3">
          <input
            type="text"
            name="Title"
            id="title"
            value={title}
            placeholder="Add Title"
            onChange={titleOnChange}
          />
          {errorMessage && (
            <div style={{ color: "red", fontSize: "12px" }}>{errorMessage}</div>
          )}
        </div>
        <label htmlFor="Description">Description</label>

        <div className="mb-3">
          <input
            type="text"
            name="Description"
            id="description"
            placeholder="Add Description"
            value={description}
            onChange={descriptionOnChange}
          />
        </div>
        <Modal.Footer>
          <Button disabled={!IsValid} type="submit">
            {isEditMode ? "Update Task" : "Add Task"}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
