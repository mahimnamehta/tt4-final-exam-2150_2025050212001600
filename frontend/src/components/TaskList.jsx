// src/components/TaskList.jsx
import React from 'react';

/**
 * @param {{ tasks: Array, onToggle: Function, onDelete: Function }} props
 */
const TaskList = ({ tasks, onToggle, onDelete }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task)}
          />
          <strong style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.title}
          </strong>{' '}
          - {task.description}
          <button onClick={() => onDelete(task.id)}>🗑️</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
