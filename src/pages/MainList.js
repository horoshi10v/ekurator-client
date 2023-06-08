import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const MainList = observer(({ store, role }) => {
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('');
    const [interestFilter, setInterestFilter] = useState('');
    const [stageFilter, setStageFilter] = useState('');


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`http://localhost:8080/users?role=${role}`);
                const data = await response.json();
                store.setUsers(data);
            } catch (error) {
                console.error('Error fetching user list:', error);
            }
        };

        fetchUsers();
    }, [role]);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleDepartmentFilterChange = (e) => {
        setDepartmentFilter(e.target.value);
    };

    const handleInterestFilterChange = (e) => {
        setInterestFilter(e.target.value);
    };

    const handleStageFilterChange = (e) => {
        setStageFilter(e.target.value);
    };

    const handleUserClick = (userId) => {
        navigate(`/user/${userId}`);
    };

    const filteredUsers = store.users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (departmentFilter === '' || user.department === departmentFilter) &&
            (stageFilter === '' || user.stage.toLowerCase().includes(stageFilter.toLowerCase())) &&
            (interestFilter === '' || user.interests.toLowerCase().includes(interestFilter.toLowerCase()))
    );

    const stage = [
        ...new Set(store.users.map((user) => user.stage.split(',').map((stage) => stage.trim())).flat()),
    ];
    const departments = [...new Set(store.users.map((user) => user.department))];
    const interests = [
        ...new Set(store.users.map((user) => user.interests.split(',').map((interest) => interest.trim())).flat()),
    ];

    return (
        <div className="container">
            <h1 className="mt-4">Всі користувачі</h1>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Пошук по імені"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
            </div>
            <div className="d-flex mb-3">
                <div className="me-2">
                    <select className="form-select" value={departmentFilter} onChange={handleDepartmentFilterChange}>
                        <option value="">Всі кафедри</option>
                        {departments.map((department) => (
                            <option key={department} value={department}>
                                {department}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <select className="form-select" value={interestFilter} onChange={handleInterestFilterChange}>
                        <option value="">Всі інтереси</option>
                        {interests.map((interest) => (
                            <option key={interest} value={interest}>
                                {interest}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="px-2">
                    <select className="form-select" value={stageFilter} onChange={handleStageFilterChange}>
                        <option value="">Всі ступені</option>
                        {stage.map((stage) => (
                            <option key={stage} value={stage}>
                                {stage}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {filteredUsers.length === 0 ? (
                <p>Немає результатів</p>
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
                            <div className="d-flex flex-column">
                                <div className="d-flex">
                                    <div className="me-3">{user.name}</div>
                                    <div className="me-3">Кафедра: {user.department}</div>
                                    <div className="me-3">Інтереси: {user.interests}</div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
});

export default MainList;
