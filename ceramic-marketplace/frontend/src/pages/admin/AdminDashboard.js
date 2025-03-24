"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/AdminDashboard.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AdminSidebar from "../../components/common/AdminSidebar";

const AdminDashboard = () => {
  const [statistics, setStatistics] = useState({
    vendeurCount: 0,
    acheteurCount: 0,
    productCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/users/statistics");
      console.log("Fetched statistics:", response.data);
      setStatistics({
        vendeurCount: response.data.vendeurCount,
        acheteurCount: response.data.acheteurCount,
        productCount: response.data.totalProducts,
      });
    } catch (error) {
      console.error("Error fetching statistics:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  }; 