import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './Form';
import Table from './Table';
import Search from './Search';
import Pagination from './Pagination';
import RecordsPerPage from './RecordsPerPage';

const Displaytable = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [editUser, setEditUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, [recordsPerPage]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users');
            const activeUsers = response.data.filter(user => user.status === true); 
            setUsers(activeUsers);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const addUser = async (user) => {
        try {
            await axios.post('http://localhost:5000/users', user);
            fetchUsers();
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    const updateUser = async (id, updatedUser) => {
        try {
            await axios.put(`http://localhost:5000/users/${id}`, updatedUser);
            fetchUsers();
            setEditUser(null); 
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const softDeleteUser = async (id) => {
        try {
           
            await axios.patch(`http://localhost:5000/users/${id}`, { status: false });
            fetchUsers(); 
        } catch (error) {
            console.error("Error performing soft delete:", error);
        }
    };

    const handleEdit = (user) => {
        setEditUser(user);
    };

    const handleFormSubmit = (user) => {
        console.log("Form Submit User:", user);
        if (editUser) {
            console.log("Updating User ID:", editUser.id);
            updateUser(editUser.id, user);
        } else {
            addUser(user);
        }
    };
    
    const indexOfLastUser = currentPage * recordsPerPage;
    const indexOfFirstUser = indexOfLastUser - recordsPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>CRUD App with Search, Pagination & Soft Delete</h1>
            <Form onSubmit={handleFormSubmit} initialData={editUser} />
            <div style={styles.controls}>
                <RecordsPerPage   setRecordsPerPage={setRecordsPerPage} />
                <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>
            <Table
                users={users}
                onDelete={softDeleteUser}
                onEdit={handleEdit}
                searchQuery={searchQuery}
                currentPage={currentPage}
                recordsPerPage={recordsPerPage}
            />
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(users.length / recordsPerPage)}
                onPageChange={setCurrentPage}
                recordsPerPage={recordsPerPage}
            />
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f4f4',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    heading: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
    },
    controls: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
    },
};

export default Displaytable;
