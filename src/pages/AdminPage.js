import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Button} from "react-bootstrap";

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8080/users', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            const data = await response.json();
            setUsers(data);
            setFilteredUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleDeleteUser = (userId, userName) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete user ${userName}?`);
        if (confirmDelete) {
            deleteUser(userId).then(r => fetchUsers());
        }
    };

    const deleteUser = async (userId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8080/user/${userId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            if (response.ok) {
                console.log('User deleted successfully');
                fetchUsers(); // Refresh the user list
            } else {
                console.error('Error deleting user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleUpdateUser = (userId) => {
        navigate(`/user/${userId}/update`); // Redirect to the update page for the selected user
    };

    const handleAddUser = () => {
        navigate('/adduser'); // Redirect to the AddUser component
    };

    return (
        <div>
            <h1>Admin Page</h1>
            <Button variant="outline-dark" className="mt-4 p-2" onClick={handleAddUser}>
                Добавить тип
            </Button>
            <ul className="list-group">
                {filteredUsers.map((user) => (
                    <li
                        key={user.id}
                        className="list-group-item d-flex align-items-center"
                        style={{ cursor: 'pointer' }}
                    >
                        <img src={user.picture} alt="User" className="rounded-circle me-3" style={{ width: '50px' }} />
                        <span>{user.name}</span>
                        <div className="ms-auto"> {/* Added "ms-auto" class to push the buttons to the right */}
                            <button
                                className="btn btn-danger m-1"
                                onClick={() => handleDeleteUser(user.ID, user.name)}
                            >
                                Delete
                            </button>
                            <button
                                className="btn btn-success m-1"
                                onClick={() => handleUpdateUser(user.ID)}
                            >
                                Update Info
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPage;