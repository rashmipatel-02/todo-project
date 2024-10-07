import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
// import './TodoApp.css';


const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('date');
  const [pageNumber, setPageNumber] = useState(0);
  const todosPerPage = 5;


  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:5001/todos');
    setTodos(response.data);
  };

  const addTodo = async (todo) => {
    await axios.post('http://localhost:5001/todos', todo);
    fetchTodos();
  };

  const updateTodo = async (id, updatedTodo) => {
    await axios.put(`http://localhost:5001/todos/${id}`, updatedTodo);
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5001/todos/${id}`);
    fetchTodos();
  };

  // Update the status of a task (toggle between 0 and 1)
  const updateTodoStatus = async (id, currentStatus) => {
    const updatedStatus = currentStatus === 1 ? 0 : 1; // Toggle status
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      await axios.put(`http://localhost:5001/todos/${id}`, {
        ...todo,
        status: updatedStatus,
      });
      fetchTodos();
    }
  };

  // Filter, sort, and paginate todos
  const filteredTodos = todos.filter((todo) =>
    todo.task.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTodos = filteredTodos.sort((a, b) =>
    sortOption === 'date'
      ? new Date(b.date) - new Date(a.date)
      : a.username.localeCompare(b.username)
  );

  const displayTodos = sortedTodos.slice(
    pageNumber * todosPerPage,
    (pageNumber + 1) * todosPerPage
  );

  const pageCount = Math.ceil(sortedTodos.length / todosPerPage);

  const changePage = (selectedPage) => {
    setPageNumber(selectedPage);
  };

  return (
    <div className="TodoApp">
      <TodoForm
        addTodo={addTodo}
        updateTodo={updateTodo}
        selectedTodo={selectedTodo}
        setSelectedTodo={setSelectedTodo}
      />
      <TodoList
        todos={displayTodos}
        deleteTodo={deleteTodo}
        setSelectedTodo={setSelectedTodo}
        updateTodoStatus={updateTodoStatus} // Pass updateTodoStatus to TodoList
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortOption={sortOption}
        setSortOption={setSortOption}
        changePage={changePage}
        pageCount={pageCount}
      />
    </div>
  );
};

export default TodoApp;
