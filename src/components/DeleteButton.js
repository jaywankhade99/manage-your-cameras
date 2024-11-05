// src/components/DeleteButton.js
import React from "react";

const DeleteButton = ({ onDelete }) => (
  <button className="delete-button" onClick={onDelete}>
    Delete
  </button>
);

export default DeleteButton;
