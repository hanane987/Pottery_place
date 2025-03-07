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

    return (
        <div className={styles.dashboardContainer}>
            <nav className={styles.sidebar}>
                <h2>Admin Dashboard</h2>
                <ul>
                    <li><Link to="/admin-dashboard"><i className="fas fa-tachometer-alt"></i> Dashboard</Link></li>
                    <li><Link to="/manage-users"><i className="fas fa-users"></i> Manage Users</Link></li>
                    <li><Link to="/manage-products"><i className="fas fa-box"></i> Manage Products</Link></li>
                    <li><Link to="/view-statistics"><i className="fas fa-chart-line"></i> View Statistics</Link></li>
                    <li><Link to="/settings"><i className="fas fa-cog"></i> Settings</Link></li>
                    <li><Link to="/contact-messages"><i className="fas fa-envelope"></i> Contact Messages</Link></li>
                </ul>
            </nav>
            <div className={styles.content}>
                <header className={styles.navbar}>
                    <div className={styles.searchContainer}>
                        <button className={styles.searchButton}><i className="fas fa-search"></i></button>
                        <input type="text" placeholder="Search..." className={styles.searchBar} />
                    </div>
                    <div className={styles.userInfo}>
                        <i className="fas fa-bell"></i>
                        <img src="path_to_user_image.jpg" alt="User" className={styles.userImage} />
                    </div>
                </header>
                <h1>Welcome to the Admin Dashboard</h1>
                <div className={styles.statistics}>
                    <div className={styles.statCard}>
                        <h3>Total Users (Vendeur)</h3>
                        <p>{statistics.vendeurCount}</p>
                    </div>
                    <div className={styles.statCard}>
                        <h3>Total Users (Acheteur)</h3>
                        <p>{statistics.acheteurCount}</p>
                    </div>
                    <div className={styles.statCard}>
                        <h3>Total Products</h3>
                        <p>{statistics.productCount}</p> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;