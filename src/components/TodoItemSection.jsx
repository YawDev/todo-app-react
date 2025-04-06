import TodoItemComponent from "./TodoItemComponent";

export default function TodoItemSection({ todoList, handleDeleteRequest }) {
  return (
    <div className="itemListWrapper">
      {todoList.length === 0 ? (
        <p>Empty List</p>
      ) : (
        <>
          {todoList.map((task) => (
            <TodoItemComponent
              key={task.id}
              todoItemId={task.id}
              handleDeleteRequest={handleDeleteRequest}
            >
              {task}
            </TodoItemComponent>
          ))}
        </>
      )}
    </div>
  );
}
