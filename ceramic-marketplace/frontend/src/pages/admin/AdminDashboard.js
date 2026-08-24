"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/AdminDashboard.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AdminSidebar from "../../components/common/AdminSidebar";
import AdminTopNav from "../../components/common/AdminTopNav";

const AdminDashboard = () => {
  const [statistics, setStatistics] = useState({
    vendeurCount: 0,
    acheteurCount: 0,
    productCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/users/statistics");
      setStatistics({
        vendeurCount: response.data.vendeurCount || 0,
        acheteurCount: response.data.acheteurCount || 0,
        productCount: response.data.totalProducts || 0,
      });
    } catch (error) {
      console.error("Error fetching statistics:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    window.location.href = "/";
  }; 

  return (
    <div className={styles.dashboardContainer}>
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
        </div>
      )}

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className={styles.content}>
        {/* Unified Top Navigation Header (Search, Notifications, Profile, Logout) */}
        <AdminTopNav searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

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

        <div className={styles.quickActions}>
          <h2>Quick Actions</h2>
          <div className={styles.actionButtons}>
            <button className={styles.actionButton}>
              <i className="fas fa-user-plus"></i>
              <span>Add User</span>
            </button>
            <button className={styles.actionButton}>
              <i className="fas fa-box-open"></i>
              <span>Add Product</span>
            </button>
            <button className={styles.actionButton}>
              <i className="fas fa-chart-bar"></i>
              <span>View Reports</span>
            </button>
            <button className={styles.actionButton}>
              <i className="fas fa-cog"></i>
              <span>Settings</span>
            </button>
            <button className={styles.actionButton} onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;