import ButtonComponent from "./ButtonComponent";
import { Button, Modal } from "react-bootstrap";

export default function DeleteConfirmationModalCompononent({
  show,
  handleClose,
  handleConfirmDelete,
  taskToDelete,
}) {
  const handleConfirmModal = (e) => {
    if (taskToDelete) {
      handleConfirmDelete(taskToDelete.id);
      handleClose();
    }
    e.preventDefault();
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {"Are you sure you want to delete this item?"}
        </Modal.Title>
      </Modal.Header>
      <form className="mt-4" onSubmit={handleConfirmModal}>
        <Modal.Body>
          <p>{taskToDelete ? taskToDelete.title : ""}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Confirm</Button>
          <ButtonComponent onAction={handleClose} btn="cancelBtn">
            Cancel
          </ButtonComponent>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
