// src/user/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/AdminDashboard.module.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import axios from 'axios'; 

const AdminDashboard = () => {
    const [statistics, setStatistics] = useState({
        vendeurCount: 0,
        acheteurCount: 0,
        productCount: 0,
    });

    useEffect(() => {
        fetchStatistics();
    }, []);
    const [loading, setLoading] = useState(true);
    const fetchStatistics = async () => {
        setLoading(true); 
        try {
            const response = await axios.get('http://localhost:5000/api/users/statistics');
            console.log('Fetched statistics:', response.data);
            setStatistics({
                vendeurCount: response.data.vendeurCount,
                acheteurCount: response.data.acheteurCount,
                productCount: response.data.totalProducts,
            });
        } catch (error) {
            console.error('Error fetching statistics:', error);
        } finally {
            setLoading(false); 
        }
    };
