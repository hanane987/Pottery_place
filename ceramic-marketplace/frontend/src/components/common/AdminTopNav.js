"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Search, Bell, LogOut } from "lucide-react";
import styles from "../../styles/AdminDashboard.module.css";

const AdminTopNav = ({ searchTerm = "", setSearchTerm }) => {
  const [adminName, setAdminName] = useState("Administrator");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAdminName(decoded.name || decoded.email || "Administrator");
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const handleLogout = () => {
    if (window.confirm("Voulez-vous vraiment vous déconnecter ?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
      window.location.href = "/login";
    }
  };

  return (
    <header className={styles.navbar}>
      {/* Search Input */}
      <div className={styles.searchContainer}>
        <Search size={18} className={styles.searchIcon} />
        <input
          type="search"
          placeholder="Search..."
          className={styles.searchBar}
          value={searchTerm}
          onChange={(event) => setSearchTerm?.(event.target.value)}
          aria-label="Search"
        />
      </div>

      {/* User Info & Actions */}
      <div className={styles.userInfo}>
        <button
          className={styles.notificationButton}
          type="button"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell size={19} />
          <span className={styles.notificationDot}></span>
        </button>

        <div className={styles.adminProfile}>
          <strong>{adminName}</strong>
          <span>Administrator</span>
        </div>

        {/* Bouton Logout */}
        <button
          onClick={handleLogout}
          type="button"
          title="Logout"
          aria-label="Logout"
          style={{
            background: "transparent",
            border: "none",
            color: "#e74c3c",
            cursor: "pointer",
            marginLeft: "12px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default AdminTopNav;