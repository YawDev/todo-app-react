import TodoItemComponent from "./TodoItemComponent";

export default function TodoItemSection() {
  return (
    <div className="itemListWrapper">
      <TodoItemComponent>Do Laundry </TodoItemComponent>
      <TodoItemComponent>Rake Leaves </TodoItemComponent>
      <TodoItemComponent>Mow Lawn </TodoItemComponent>
      <TodoItemComponent>Walk Dog </TodoItemComponent>
    </div>
  );
}
