import React from "react";

const ActivityFeed = ({ entries }) => {
  if (entries.length === 0)
    return <p className="text-muted">No entries yet. Add your first one!</p>;

  return (
    <ul className="list-group">
      {entries.map((entry, index) => (
        <li
          key={index}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <div>
            <strong>{entry.mood}</strong> — {entry.steps} steps,{" "}
            {entry.waterIntake}L water
          </div>
          <small className="text-muted">
            {new Date(entry.createdAt).toLocaleDateString()}
          </small>
        </li>
      ))}
    </ul>
  );
};

export default ActivityFeed;
