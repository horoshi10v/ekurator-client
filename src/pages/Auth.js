// import React from 'react';
// import { GoogleLogin } from 'react-google-login';
// import { useHistory } from 'react-router-dom';
//
// function Auth() {
//     const handleGoogleLoginSuccess = (response) => {
//         // Send the Google token to the backend for verification
//         // and receive an access token or user information in response
//         // You can use the fetch or axios library to make the API request
//         fetch('http://127.0.0.1:8080/google_callback', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ token: response.tokenId }),
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 // Handle the response from the backend
//                 console.log(data);
//             })
//             .catch((error) => {
//                 // Handle any errors
//                 console.error(error);
//             });
//
//     };
//
//     const handleGoogleLoginFailure = (error) => {
//         // Handle login failure
//         console.error(error);
//     };
//
//     return (
//         <div>
//             <h1>Authentication Page</h1>
//             <GoogleLogin
//                 clientId="785064301558-93gl5u751h2hmk53gc6532ekk6mhfk5h.apps.googleusercontent.com"
//                 buttonText="Login with Google"
//                 onSuccess={handleGoogleLoginSuccess}
//                 onFailure={handleGoogleLoginFailure}
//                 cookiePolicy="single_host_origin"
//             />
//         </div>
//     );
// }
//
// export default Auth;

import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

function AuthPage() {
    const navigate = useNavigate();

    const handleGoogleLoginSuccess = (response) => {
        // Send the Google token to the backend for verification
        // and receive an access token or user information in response
        // You can use the fetch or axios library to make the API request
        fetch('http://127.0.0.1:8080/google_login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: response.tokenId }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response from the backend
                console.log(data);
                // Redirect to the user page upon successful login
                navigate('/user');
            })
            .catch((error) => {
                // Handle any errors
                console.error(error);
            });
    };

    const handleGoogleLoginFailure = (error) => {
        // Handle login failure
        console.error(error);
    };

    return (
        <div>
            <h1>Authentication Page</h1>
            <GoogleLogin
                clientId="785064301558-93gl5u751h2hmk53gc6532ekk6mhfk5h.apps.googleusercontent.com"
                buttonText="Login Google"
                onSuccess={handleGoogleLoginSuccess}
                onFailure={handleGoogleLoginFailure}
                cookiePolicy="single_host_origin"
            />
        </div>
    );
}

export default AuthPage;
