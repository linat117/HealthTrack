// src/components/ActivityFeed.jsx
import React from "react";

const ActivityFeed = ({ entries }) => {
  if (!entries || entries.length === 0) {
    return <p>No activity yet.</p>;
  }

  return (
    <ul className="list-group">
      {entries.map((entry) => (
        <li key={entry._id} className="list-group-item">
          <div>
            <strong>Date:</strong>{" "}
            {new Date(entry.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div>
            {entry.weight && <span>Weight: {entry.weight} kg, </span>}
            {entry.bloodPressure && <span>BP: {entry.bloodPressure}, </span>}
            {entry.steps && <span>Steps: {entry.steps}, </span>}
            {entry.notes && <span>Notes: {entry.notes}</span>}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ActivityFeed;
