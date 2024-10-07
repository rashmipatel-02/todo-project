import React from 'react';
import './Table.css'; 

const Table = ({ users, onDelete, onEdit, searchQuery, currentPage, recordsPerPage }) => {
   
    const lowercasedSearchQuery = searchQuery.toLowerCase();

    const filteredUsers = users
        .filter(user =>
            (user.status === true) && // Only show active users
            (
                user.name.toLowerCase().includes(lowercasedSearchQuery) ||
                user.email.toLowerCase().includes(lowercasedSearchQuery) ||
                user.phone.includes(lowercasedSearchQuery) // phone remains as it is
            )
        )
        .slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

    return (
        <table className="styled-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {filteredUsers.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td><img src={user.image} alt={user.name} width={50} /></td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                            <button className="edit-btn" onClick={() => onEdit(user)}>Edit</button>
                            <button className="delete-btn" onClick={() => onDelete(user.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
