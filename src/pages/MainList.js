import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MainList() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('');
    const [interestFilter, setInterestFilter] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8080/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching user list:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleDepartmentFilterChange = (e) => {
        setDepartmentFilter(e.target.value);
    };

    const handleInterestFilterChange = (e) => {
        setInterestFilter(e.target.value);
    };

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (departmentFilter === '' || user.department === departmentFilter) &&
            (interestFilter === '' || user.interests.toLowerCase().includes(interestFilter.toLowerCase()))
    );

    const handleUserClick = (userId) => {
        navigate(`/user/${userId}`);
    };

    const departments = [...new Set(users.map((user) => user.department))];
    const interests = [...new Set(users.map((user) => user.interests.split(',').map((interest) => interest.trim())).flat())];

    return (
        <div className="container">
            <h1 className="mt-4">Всі користувачі</h1>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
            </div>
            <div className="d-flex mb-3">
                <div className="me-2">
                    <select
                        className="form-select"
                        value={departmentFilter}
                        onChange={handleDepartmentFilterChange}
                    >
                        <option value="">Всі кафедри</option>
                        {departments.map((department) => (
                            <option key={department} value={department}>
                                {department}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <select
                        className="form-select"
                        value={interestFilter}
                        onChange={handleInterestFilterChange}
                    >
                        <option value="">Всі інтереси</option>
                        {interests.map((interest) => (
                            <option key={interest} value={interest}>
                                {interest}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {filteredUsers.length === 0 ? (
                <p>No users</p>
            ) : (
                <ul className="list-group">
                    {filteredUsers.map((user) => (
                        <li
                            key={user.ID}
                            className="list-group-item d-flex align-items-center"
                            onClick={() => handleUserClick(user.ID)}
                            style={{ cursor: 'pointer' }}
                        >
                            <img src={user.picture} alt="User" className="rounded-circle me-3" style={{ width: '50px' }} />
                            <span>{user.name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MainList;
