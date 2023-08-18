// src/components/Card.jsx
import React from 'react';

const Card = ({ ticket }) => {
  return (
    <div className="card">
      <p>{ticket.title}</p> {/* Display only the ticket title */}
    </div>
  );
};

export default Card;
