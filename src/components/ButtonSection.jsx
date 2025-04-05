import ButtonComponent from "./ButtonComponent";
import { Trash, Pencil } from "react-bootstrap-icons";

export default function ButtonSection() {
  return (
    <section className="btnSection">
      <ButtonComponent btn="edit-btn">
        <Pencil />
      </ButtonComponent>
      <ButtonComponent btn="delete-btn">
        <Trash />
      </ButtonComponent>
    </section>
  );
}
