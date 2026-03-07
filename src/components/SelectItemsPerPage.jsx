import { useState } from "react";

const SelectItemsPerPage = ({ paginationData, setPaginationData }) => {
  const { itemsPerPage } = paginationData;

  const [selectedValue, setSelectedValue] = useState(itemsPerPage);
  console.log(selectedValue, "items-per-pg");

  const dropDownValues = [2, 4, 5, 10, 15, 20, 25];

  const handleSelectChange = (value) => {
    setSelectedValue(value);
    setPaginationData((prev) => ({
      ...prev,
      itemsPerPage: value,
      currentPage: 1,
    }));
  };

  return (
    <div>
      <label htmlFor="items-per-page-select">Items Per Page: </label>
      <select
        id="items-per-page"
        value={selectedValue}
        onChange={(e) => handleSelectChange(e.target.value)}
      >
        {dropDownValues.map((dropDownItem, index) => (
          <option key={index} value={dropDownItem}>
            {dropDownItem}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectItemsPerPage;
