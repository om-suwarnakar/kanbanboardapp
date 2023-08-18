// src/components/GroupingOptions.js
import React from 'react';

const GroupingOptions = ({ onChange }) => {
  const handleOptionChange = event => {
    onChange(event.target.value);
  };

  return (
    <div className="grouping-options">
      <label className="grouping-label">
        Grouping
      </label>
      <select onChange={handleOptionChange}>
        <option value="status">Status</option>
        <option value="user">User</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
}

export default GroupingOptions;
