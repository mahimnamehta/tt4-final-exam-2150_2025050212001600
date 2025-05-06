import React, { useEffect, useState } from 'react';
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from './services/taskService';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    completed: false,
  });

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask(newTask);
    setNewTask({ title: '', description: '', completed: false });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  const toggleCompleted = async (task) => {
    await updateTask({ ...task, completed: !task.completed });
    fetchTasks();
  };

  return (
    <div className="container">
      <h1>📋 Task Manager</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          required
        />
        <button type="submit">Add Task</button>
      </form>

      <TaskList tasks={tasks} onToggle={toggleCompleted} onDelete={handleDelete} />
    </div>
  );
}

export default App;
