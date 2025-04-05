export default function ButtonComponent({ children, btn, onAction }) {
  return (
    <button className={btn} onClick={onAction}>
      {children}
    </button>
  );
}
