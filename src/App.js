import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import AppRouter from './components/AppRouter'
import NavBar from "./components/NavBar";
import {UserProvider} from "./components/UserContext";

function App() {
  return (
    <BrowserRouter>
        <UserProvider>
            <NavBar/>
            <AppRouter/>
        </UserProvider>
    </BrowserRouter>
  );
}

export default App;
