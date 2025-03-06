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
    
       
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token); 
            
            
            const role = response.data.role;
           
        } catch (err) {
            setError('Invalid credentials');
        }
    };