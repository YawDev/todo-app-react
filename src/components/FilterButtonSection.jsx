export default function FilterButtonSection() {
  return (
    <div className="login-form-group checkbox-group">
      <input type="checkbox" id="filter-incomplete" />
      <label htmlFor="filter-incomplete" className="checkbox-label">
        Show incomplete
      </label>
      <input type="checkbox" id="filter-complete" />
      <label htmlFor="filter-complete" className="checkbox-label">
        Show complete
      </label>
    </div>
  );
}
