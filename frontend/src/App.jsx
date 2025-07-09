import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { getTasks, createTask } from './services/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks. Please try again later.');
      setTasks([]); // Clear tasks on error
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (description) => {
    try {
      const newTask = await createTask({ description });
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setError(null);
    } catch (err) {
      console.error('Error adding task:', err);
      setError('Failed to add task. Description must not be empty.');
    }
  };

  return (
    <div className="container">
      <h1>Hello World Task List</h1>
      <TaskForm onAddTask={handleAddTask} />
      {loading && <p>Loading tasks...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && tasks.length === 0 && <p>No tasks found. Add a new one!</p>}
      {!loading && !error && tasks.length > 0 && <TaskList tasks={tasks} />}
    </div>
  );
}

export default App;
