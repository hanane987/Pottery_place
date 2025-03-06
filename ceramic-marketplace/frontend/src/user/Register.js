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
   
        }
        try {
            await axios.post('http://localhost:5000/api/auth/register', { name, email, password, role });
            alert('Registration successful');
        } catch (err) {
            setError('Error registering user');
        }
    };
