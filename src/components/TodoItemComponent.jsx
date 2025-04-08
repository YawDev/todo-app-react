import { useState, useEffect } from "react";
import ButtonComponent from "./ButtonComponent";
import ButtonSection from "./ButtonSection";

export default function TodoItemComponent({
  todoItemId,
  children,
  handleDeleteRequest,
  handleEditRequest,
}) {
  return (
    <div className="todo-item">
      <input type="hidden" name="todoItemId" value={todoItemId} />
      <input type="checkbox" name="" id="" />
      {children.title}
      <ButtonSection
        deleteAction={() =>
          handleDeleteRequest({
            id: todoItemId,
            title: children.title,
            description: children.description,
          })
        }
        editAction={() => {
          handleEditRequest({
            id: todoItemId,
            title: children.title,
            description: children.description,
          });
        }}
      />
    </div>
  );
}
