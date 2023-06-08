import React, { useContext } from 'react';
import { UserContext } from "../components/UserContext";
import { useNavigate } from "react-router-dom";

function UserPage() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    if (!user) {
        return (
            <div className="container d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
                <div className="card p-5">
                    <p className="text-center mb-4">To view the page content, please log in first.</p>
                    <div className="d-flex justify-content-center">
                        <a href="http://localhost:8080/google_login" className="btn btn-success">
                            Log In
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    const handleUserClick = (userId) => {
        navigate(`/user/${userId}/update`);
    };

    const formattedDescription = user.description.replace(/\n/g, "<br>");

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <img
                            src={user.picture}
                            alt="User"
                            className="card-img-top"
                            style={{ width: '40%' }}
                        />
                        <div className="card-body">
                            <h2 className="card-title">{user.name}</h2>
                            <p className="card-text">
                                <a href={`mailto:${user.email}`}>{user.email}</a>
                            </p>
                            <p className="card-text">
                                <strong>Role: </strong>{user.role}
                            </p>
                            <p className="card-text">
                                <strong>Department: </strong>{user.department}
                            </p>
                            <p className="card-text">
                                <strong>Interests: </strong>{user.interests}
                            </p>
                            <p className="card-text">
                                <strong>Phone: </strong>{user.phone}
                            </p>
                            <button
                                className="btn btn-primary"
                                onClick={() => handleUserClick(user.ID)}
                            >
                                Update Info
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">About Me</h5>
                            <p className="card-text" dangerouslySetInnerHTML={{ __html: formattedDescription }}></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserPage;
