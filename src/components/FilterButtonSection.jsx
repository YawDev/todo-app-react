import { useState } from "react";

export default function FilterButtonSection({ checkedBoxes, setCheckedBoxes }) {
  const handleChange = (e) => {
    const { name, checked } = e.target;

    if (checked) {
      setCheckedBoxes((checkedBoxes) => ({
        ...checkedBoxes,
        [name]: checked,
      }));
      // console.log(name, checked); // should print true OR false
    } else {
      setCheckedBoxes((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  return (
    <div className="login-form-group checkbox-group">
      {(!checkedBoxes.filterComplete || checkedBoxes.filterIncomplete) && (
        <>
          <input
            type="checkbox"
            id="filterIncomplete"
            name="filterIncomplete"
            checked={checkedBoxes.filterIncomplete}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="filterIncomplete" className="checkbox-label">
            Not Done
          </label>
        </>
      )}
      {(!checkedBoxes.filterIncomplete || checkedBoxes.filterComplete) && (
        <>
          <input
            type="checkbox"
            id="filterComplete"
            name="filterComplete"
            checked={checkedBoxes.filterComplete}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="filterComplete" className="checkbox-label">
            Done
          </label>
        </>
      )}
    </div>
  );
}
