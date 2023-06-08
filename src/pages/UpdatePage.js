import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../components/UserContext';

function UpdatePage() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [userData, setUserData] = useState(null);
    const [picture, setPicture] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [department, setDepartment] = useState('');
    const [interests, setInterests] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8080/user/${userId}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                const content = await response.json();
                setUserData(content);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [userId]);

    useEffect(() => {
        if (userData) {
            setPicture(userData.picture);
            setName(userData.name);
            setEmail(userData.email);
            setRole(userData.role);
            setDepartment(userData.department);
            setInterests(userData.interests);
            setPhone(userData.phone);
            setDescription(userData.description);
        }
    }, [userData]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const updatedUser = {
            picture,
            email,
            name,
            role,
            department,
            interests,
            description: description.replace(/\n/g, '<br>'), // Replace newline characters with <br> tags,
            phone,
        };

        try {
            const response = await fetch(`http://127.0.0.1:8080/user/${userId}/update`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(updatedUser),
            });

            if (response.ok) {
                // Handle success
                navigate('/user');
                console.log('User updated successfully');
                // Redirect or show a success message
            } else {
                // Handle error
                console.error('Error updating user');
                // Show an error message
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    if (!userData) {
        return <div>Loading user data...</div>;
    }

    return (
        <div className="container">
            <h1>Update User Information</h1>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Picture
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={picture}
                        onChange={(e) => setPicture(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">
                        Role
                    </label>
                    <select
                        className="form-control"
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="">Select a role</option>
                        <option value="студент">студент</option>
                        <option value="куратор">куратор</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="department" className="form-label">
                        Department
                    </label>
                    <select
                        className="form-control"
                        id="department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                    >
                        <option value="">Select a department</option>
                        <option value="ЕОМ">ЕОМ</option>
                        <option value="АПОТ">АПОТ</option>
                        <option value="БІТ">БІТ</option>
                        <option value="КІТС">КІТС</option>
                        <option value="ІУС">ІУС</option>
                        <option value="ШІ">ШІ</option>
                        <option value="СТ">СТ</option>
                        <option value="ПІ">ПІ</option>
                        <option value="МСТ">МСТ</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="interests" className="form-label">
                        Interests
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="interests"
                        value={interests}
                        onChange={(e) => setInterests(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                        Phone
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary mb-5">
                    Оновити
                </button>
            </form>
        </div>
    );
}

export default UpdatePage;
