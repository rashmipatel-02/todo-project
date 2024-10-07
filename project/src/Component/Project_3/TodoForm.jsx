import React, { useState, useEffect } from 'react';
import './TodoForm.css'; 

const TodoForm = ({ addTodo, updateTodo, selectedTodo, setSelectedTodo }) => {
  const [task, setTask] = useState('');
  const [username, setUsername] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState(false);
  const [taskType, setTaskType] = useState('other');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedTodo) {
      setTask(selectedTodo.task);
      setUsername(selectedTodo.username);
      setDate(selectedTodo.date);
      setStatus(selectedTodo.status === 1);
      setTaskType(selectedTodo.task_type);
    }
  }, [selectedTodo]);

  const validateForm = () => {
    const newErrors = {};
    if (task.length < 3) newErrors.task = 'Task must be at least 3 characters';
    if (!username) newErrors.username = 'Username cannot be blank';
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) newErrors.date = 'Date must be in YYYY-MM-DD format';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const todo = {
      task,
      username,
      date,
      status: status ? 1 : 0,
      task_type: taskType,
    };

    if (selectedTodo) {
      updateTodo(selectedTodo.id, todo);
    } else {
      addTodo(todo);
    }

    clearForm();
  };

  const clearForm = () => {
    setTask('');
    setUsername('');
    setDate('');
    setStatus(false);
    setTaskType('other');
    setErrors({});
    setSelectedTodo(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      {errors.task && <p>{errors.task}</p>}

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {errors.username && <p>{errors.username}</p>}

      <input
        type="text"
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      {errors.date && <p>{errors.date}</p>}

      <label>
        Status:
        <input
          type="checkbox"
          checked={status}
          onChange={() => setStatus(!status)}
        />
      </label>

      <select value={taskType} onChange={(e) => setTaskType(e.target.value)}>
        <option value="office">Office</option>
        <option value="personal">Personal</option>
        <option value="family">Family</option>
        <option value="friends">Friends</option>
        <option value="other">Other</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
};

export default TodoForm;
