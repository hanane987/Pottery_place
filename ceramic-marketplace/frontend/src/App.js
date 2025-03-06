// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './user/Login';
import Register from './user/Register';
;


const App = () => {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<LandingPage />} />
            
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
               
            </Routes>
        </Router>
    );
};

export default App;