// src/components/StatusToggle.js
import React from "react";

const StatusToggle = ({ status, onToggle }) => {
  const newStatus = status === "Active" ? "Inactive" : "Active";
  return (
    <button
      className={`status-toggle ${status === "Active" ? "active" : "inactive"}`}
      onClick={() => onToggle(newStatus)}>
      {status}
    </button>
  );
};

export default StatusToggle;
