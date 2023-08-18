import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const avatarIconPath = `${process.env.PUBLIC_URL}/man.png`;

const Card = ({ ticket, groupingOption}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(prevChecked => !prevChecked);
  };

  return (
    <div className="card">
      <div className="checkbox-and-content">
        <label className="checkbox-container">
          <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
          <span className="checkmark"></span>
        </label>
        <div className="content">
          <div style = {{display:"flex"}}>
          <p>{ticket.title}</p>
          {groupingOption!=='user'?<img
            src={avatarIconPath}
            alt="Avatar"
            style={{ marginLeft: "10px", width: "25px", height: "25px" }}/> :null}
          </div>     
          <div className="label">Feature Request</div>
        </div>
      </div>
    </div>
  );
};

export default Card;















