"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/ContactMessages.module.css";
import dashboardStyles from "../../styles/AdminDashboard.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AdminSidebar from "../../components/common/AdminSidebar";

const ContactMessagesWithSidebar = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/contact");
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMessage = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await axios.delete(`http://localhost:5000/api/contact/${id}`);
        fetchMessages();
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    }
  };

  const handleMarkAsRead = async (id, isRead) => {
    try {
      await axios.put(`http://localhost:5000/api/contact/${id}`, { isRead: !isRead });
      fetchMessages();
    } catch (error) {
      console.error("Error updating message status:", error);
    }
  };

  const filteredMessages = messages.filter(
    (message) =>
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase()),
  ); 