import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/Login.module.css'; 

const Register = () => {
    const [name, setName] = useState(''); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('acheteur'); 
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setError('All fields are required');
            return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError('Please enter a valid email address');
            return;
        }
    
        if (password.length < 6) { 
            setError('Password must be at least 6 characters long');
            return;
        }
        try {
            await axios.post('http://localhost:5000/api/auth/register', { name, email, password, role });
            alert('Registration successful');
        } catch (err) {
            setError('Error registering user');
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginForm}>
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
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
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="acheteur">Acheteur</option>
                        <option value="vendeur">Vendeur</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button type="submit">Register</button>
                </form>
                {error && <p className={styles.error}>{error}</p>}
            </div>
        </div>
    );
};

export default Register;