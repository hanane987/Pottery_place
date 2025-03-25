import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css'; // Import the CSS module

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Email and password are required');
            return;
        }
    
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
        if (!emailPattern.test(email)) {
            setError('Please enter a valid email address');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token); // Store the token
            
            // Redirect based on user role
            const role = response.data.role;
            if (role === 'admin') {
                navigate('/admin-dashboard'); 
            } else if (role === 'vendeur') {
                navigate('/vendeur-dashboard'); 
            } else {
                navigate('/shop'); 
            }
        } catch (err) {
            setError('Invalid credentials');
        }
    };
    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginForm}>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
                {error && <p className={styles.error}>{error}</p>}
            </div>
        </div>
    );
};

export default Login;