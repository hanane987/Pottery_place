import React, { useEffect, useState } from 'react';
import axios from 'axios';
import adminStyles from "../../styles/AdminDashboard.module.css";
import styles from "../../styles/ManageUsers.css"; // Updated to CSS module
import AdminSidebar from "../../components/common/AdminSidebar";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/artisans");
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
      setUsers(users.map((user) => (user._id === userId ? { ...user, is_banned: true } : user)));
    } catch (error) {
      console.error("Error banning user:", error);
    }
  };

  const handleUnbanUser = async (userId) => {
    try {
      await axios.put(`http://localhost:5000/api/users/unban/${userId}`);
      setUsers(users.map((user) => (user._id === userId ? { ...user, is_banned: false } : user)));
    } catch (error) {
      console.error("Error unbanning user:", error);
    }
  };

  if (loading) {
    return (
      <div className={adminStyles.dashboardContainer}>
        <AdminSidebar />
        <div className={styles.manageUsersContainer}>
          <h1>Manage Users</h1>
          <div className={styles.loadingSpinner}>
            <div className={styles.spinner}></div>
          </div>
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className={adminStyles.dashboardContainer}>
        <AdminSidebar />
        <div className={styles.manageUsersContainer}>
          <h1>Manage Users</h1>
          <div className={styles.emptyState}>
            <p>No users found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={adminStyles.dashboardContainer}>
      <AdminSidebar />
      <div className={styles.manageUsersContainer}>
        <h1>Manage Users</h1>
        <table className={styles.usersTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`${styles.statusBadge} ${user.is_banned ? styles.statusBanned : styles.statusActive}`}>
                    {user.is_banned ? "Banned" : "Active"}
                  </span>
                </td>
                <td>
                  {user.is_banned ? (
                    <button className={`${styles.actionButton} ${styles.unbanButton}`} onClick={() => handleUnbanUser(user._id)}>
                      Unban
                    </button>
                  ) : (
                    <button className={`${styles.actionButton} ${styles.banButton}`} onClick={() => handleBanUser(user._id)}>
                      Ban
                    </button>
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