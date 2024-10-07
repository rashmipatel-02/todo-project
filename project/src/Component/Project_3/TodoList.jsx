import React from 'react';
import ReactPaginate from 'react-paginate';
import './TodoList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const TodoList = ({
    todos,
    deleteTodo,
    setSelectedTodo,
    updateTodoStatus,
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
    changePage,
    pageCount,
}) => {
    return (
        <div className="TodoList">
            <div className="search-sort-container">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option value="date">Sort by Date</option>
                    <option value="username">Sort by Username</option>
                </select>
            </div>

            <ul>
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        style={{
                            backgroundColor: todo.status === 1 ? 'white' : getTaskColor(todo.task_type),
                            padding: '10px',
                            margin: '10px 0',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <div>
                            <strong>{todo.task}</strong> - {todo.username} - {todo.date}
                        </div>

                        <input
                            type="checkbox"
                            checked={todo.status === 1}
                            onChange={() => updateTodoStatus(todo.id, todo.status)}
                        />

                        <div>
                            <button onClick={() => setSelectedTodo(todo)} className="icon-button">
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button onClick={() => deleteTodo(todo.id)} className="icon-button">
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                pageCount={pageCount}
                onPageChange={(data) => changePage(data.selected)}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
        </div>
    );
};

const getTaskColor = (type) => {
    switch (type) {
        case 'office':
            return 'red';
        case 'personal':
            return 'yellow';
        case 'family':
            return 'green';
        case 'friends':
            return 'cyan';
        default:
            return 'lightgray';
    }
};

export default TodoList;

