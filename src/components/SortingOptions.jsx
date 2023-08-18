/// src/components/SortingOptions.jsx
import React from 'react';

const SortingOptions = ({ onChange }) => {
  return (
    <div className="sorting-options">
      <label>Sort by:</label>
      <select onChange={e => onChange(e.target.value)}>
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
};

export default SortingOptions;

