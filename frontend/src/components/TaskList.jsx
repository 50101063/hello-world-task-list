import React from 'react';

function TaskList({ tasks }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id}>
          <span>{task.description}</span>
          {/* Optional: Display creation date */}
          {task.created_at && (
            <small>Created: {new Date(task.created_at).toLocaleDateString()}</small>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
