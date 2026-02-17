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
  editMode = { taskToEdit: null, isOn: false },
}) {
  const [formInput, setFormInput] = useState({
    title: { value: "", error: "", isValid: false },
    description: { value: "", error: "", isValid: false },
  });

  const { taskToEdit, isOn } = editMode;
  let isEdit = isOn;

  useEffect(() => {
    if (!show) {
      setFormInput((prev) => ({
        ...prev,
        title: {
          ...prev.title,
          value: "",
          error: "",
          isValid: false,
        },
        description: {
          ...prev.description,
          value: "",
        },
      }));
    } else if (isEdit && taskToEdit) {
      setFormInput((prev) => ({
        ...prev,
        title: {
          ...prev.title,
          value: taskToEdit?.title,
          isValid: Validate(taskToEdit?.title),
        },
        description: {
          ...prev.description,
          value: taskToEdit?.description || "",
        },
      }));
    }
  }, [show, isEdit, taskToEdit]);

  const titleOnChange = (e) => {
    const input = e.target.value;
    setFormInput((prev) => ({
      ...prev,
      title: {
        ...prev.title,
        value: input,
        error: !input.trim() ? "Title is required" : "",
        isValid: Validate(input),
      },
    }));
  };

  const descriptionOnChange = (e) => {
    const input = e.target.value;
    setFormInput((prev) => ({
      ...prev,
      description: {
        ...prev.description,
        value: input,
      },
    }));
  };

  const handleSubmitModal = (e) => {
    e.preventDefault();
    if (isEdit && Validate(formInput.title.value)) {
      handleSubmit(
        formInput.title.value,
        formInput.description.value,
        isEdit,
        taskToEdit,
      );
    } else if (Validate(formInput.title.value)) {
      handleSubmit(
        formInput.title.value,
        formInput.description.value,
        false,
        null,
      );
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {editMode?.isOn ? "Edit Task" : "Add New Task"}
        </Modal.Title>
      </Modal.Header>
      <form className="mt-4" onSubmit={handleSubmitModal}>
        <label htmlFor="Title">Title</label>

        <div className="mb-3">
          <input
            type="text"
            name="Title"
            id="title"
            value={formInput.title.value}
            placeholder="Add Title"
            onChange={titleOnChange}
          />
          {formInput.title.error && (
            <div style={{ color: "red", fontSize: "12px" }}>
              {formInput.title.error}
            </div>
          )}
        </div>
        <label htmlFor="Description">Description</label>

        <div className="mb-3">
          <input
            type="text"
            name="Description"
            id="description"
            placeholder="Add Description"
            value={formInput.description.value}
            onChange={descriptionOnChange}
          />
        </div>
        <Modal.Footer>
          <Button disabled={!formInput.title.isValid} type="submit">
            {isEdit ? "Update Task" : "Add Task"}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
