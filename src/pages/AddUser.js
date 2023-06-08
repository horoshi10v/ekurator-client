import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {useState} from "react";

function AddUserForm() {
    const navigate = useNavigate();

    const [picture, setPicture] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [department, setDepartment] = useState('');
    const [interests, setInterests] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();

        axios.post('http://127.0.0.1:8080/addUser', {
          picture,
          name,
          email,
          role,
          department,
          interests,
          phone,
          description
        })
        .then(() => {
          // User added successfully, navigate to a success page or any other desired route
          navigate('/admin');
        })
        .catch((error) => {
          // Handle error if the user couldn't be added
          console.error(error);
        });

        // Reset the form fields
        setPicture('');
        setName('');
        setEmail('');
        setRole('');
        setDepartment('');
        setInterests('');
        setPhone('');
        setDescription('');

        // Navigate to a success page or any other desired route
        navigate('/admin');
    };

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
                    Додати
                </button>
            </form>
        </div>
    );
}

export default AddUserForm;
