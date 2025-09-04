import FilterButtonSection from "./FilterButtonSection";
import TodoItemComponent from "./TodoItemComponent";
import { useState } from "react";
export default function TodoItemSection({
  todoList,
  handleDeleteRequest,
  handleEditRequest,
  handleTaskStatusRequest,
  searchTerm,
  setCheckedBoxes,
  checkedBoxes,
}) {
  const isSearchActive = searchTerm.trim() !== "";

  return (
    <>
      <FilterButtonSection
        checkedBoxes={checkedBoxes}
        setCheckedBoxes={setCheckedBoxes}
      />
      <div className="itemListWrapper">
        {todoList.length === 0 ? (
          <p>{isSearchActive ? "No results found" : "Empty List"}</p>
        ) : (
          <>
            {todoList.map((task) => (
              <TodoItemComponent
                key={task.id}
                todoItemId={task.id}
                handleDeleteRequest={handleDeleteRequest}
                handleEditRequest={handleEditRequest}
                handleTaskStatusRequest={handleTaskStatusRequest}
                setCheckedBoxes={setCheckedBoxes}
                checkedBoxes={checkedBoxes}
              >
                {task}
              </TodoItemComponent>
            ))}
          </>
        )}
      </div>
    </>
  );
}
