import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ViewPage() {
    const { userId } = useParams();
    const [viewData, setViewData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8080/user/${userId}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                const content = await response.json();
                setViewData(content);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [userId]);

    if (!viewData) {
        return <div>Loading user data...</div>;
    }

    const formattedDescription = viewData.description.replace(/\n/g, '<br>'); // Replace newline characters with <br> tags

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <img
                            src={viewData.picture}
                            alt="User"
                            className="card-img-top"
                            style={{ width: '40%' }}
                        />
                        <div className="card-body">
                            <h2 className="card-title">{viewData.name}</h2>
                            <p className="card-text">
                                <a href={`mailto:${viewData.email}`}>{viewData.email}</a>
                            </p>
                            <p className="card-text">
                                <strong>Role: </strong>
                                {viewData.role}
                            </p>
                            <p className="card-text">
                                <strong>Department: </strong>
                                {viewData.department}
                            </p>
                            <p className="card-text">
                                <strong>Ступінь: </strong>
                                {viewData.stage}
                            </p>
                            <p className="card-text">
                                <strong>Interests: </strong>
                                {viewData.interests}
                            </p>
                            <p className="card-text">
                                <strong>Phone: </strong>
                                {viewData.phone}
                            </p>
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

export default ViewPage;
