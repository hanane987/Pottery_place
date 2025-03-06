import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Login.module.css'; 

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
