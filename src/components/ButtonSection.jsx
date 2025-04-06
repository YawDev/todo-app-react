import ButtonComponent from "./ButtonComponent";
import { Trash, Pencil } from "react-bootstrap-icons";

export default function ButtonSection({ deleteAction, editAction }) {
  return (
    <section className="btnSection">
      <ButtonComponent onAction={editAction} btn="edit-btn">
        <Pencil />
      </ButtonComponent>
      <ButtonComponent onAction={deleteAction} btn="delete-btn">
        <Trash />
      </ButtonComponent>
    </section>
  );
}
