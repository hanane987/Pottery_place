import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import adminStyles from "../styles/AdminDashboard.module.css"; // Import the second CSS module
import styles from "../styles/ManageUsers.module.css"


const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/artisans'); // Ensure this matches your route
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleBanUser = async (userId) => {
        try {
            await axios.put(`http://localhost:5000/api/users/ban/${userId}`);
            setUsers(users.map(user => user._id === userId ? { ...user, is_banned: true } : user));
        } catch (error) {
            console.error("Error banning user:", error);
        }
    };

    const handleUnbanUser = async (userId) => {
        try {
            await axios.put(`http://localhost:5000/api/users/unban/${userId}`);
            setUsers(users.map(user => user._id === userId ? { ...user, is_banned: false } : user));
        } catch (error) {
            console.error("Error unbanning user:", error);
        }
    };

    if (loading) {
        return <div>Loading users...</div>;
    }

    return (
        <div className={styles.dashboardContainer}>
            {loading && (
                <div className={styles.loadingOverlay}>
                    <div className={styles.spinner}></div>
                </div>
            )}
  
  <nav className={adminStyles.sidebar}> {/* Use adminStyles for sidebar */}
                <h2>Admin Dashboard</h2>
                <ul>
                    <li>
                        <Link to="/admin-dashboard">
                            <i className="fas fa-tachometer-alt"></i> Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/manage-users">
                            <i className="fas fa-users"></i> Manage Users
                        </Link>
                    </li>
                    <li>
                        <Link to="/manage-products">
                            <i className="fas fa-box"></i> Manage Products
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact-messages">
                            <i className="fas fa-envelope"></i> Contact Messages
                        </Link>
                    </li>
                </ul>
            </nav>
            <div>
                <h1>Manage Users</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.is_banned ? 'Banned' : 'Active'}</td>
                                <td>
                                    {user.is_banned ? (
                                        <button onClick={() => handleUnbanUser(user._id)}>Unban</button>
                                    ) : (
                                        <button onClick={() => handleBanUser(user._id)}>Ban</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;