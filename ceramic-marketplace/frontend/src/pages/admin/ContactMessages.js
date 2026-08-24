"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/ContactMessages.module.css";
import dashboardStyles from "../../styles/AdminDashboard.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AdminSidebar from "../../components/common/AdminSidebar";
import AdminTopNav from "../../components/common/AdminTopNav";

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
      String(message.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(message.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(message.subject || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(message.message || "").toLowerCase().includes(searchTerm.toLowerCase()),
  ); 
  return (
    <div className={dashboardStyles.dashboardContainer}>
      <AdminSidebar />
      <AdminTopNav searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className={dashboardStyles.content}>
        <div className={styles.container}>
          <h1>Contact Messages</h1>

          {loading ? (
            <p>
              <i className="fas fa-spinner fa-spin"></i> Loading messages...
            </p>
          ) : filteredMessages.length === 0 ? (
            <div className={styles.emptyState}>
              <i className="fas fa-envelope-open"></i>
              <h3>No messages found</h3>
              <p>There are no contact messages matching your search criteria.</p>
            </div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMessages.map((message) => (
                  <tr key={message._id || message.id}>
                    <td>{message.name}</td>
                    <td>{message.email}</td>
                    <td>{message.subject}</td>
                    <td>{message.message}</td>
                    <td>{message.date || message.createdAt ? new Date(message.date || message.createdAt).toLocaleDateString() : "N/A"}</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${message.isRead ? styles.statusRead : styles.statusNew}`}
                      >
                        {message.isRead ? "Read" : "New"}
                      </span>
                    </td>
                    <td>
                      <button
                        className={`${styles.actionButton} ${styles.viewButton}`}
                        onClick={() => handleMarkAsRead(message._id || message.id, message.isRead)}
                      >
                        <i className={`fas ${message.isRead ? "fa-envelope" : "fa-envelope-open"}`}></i>
                        {message.isRead ? "Mark as Unread" : "Mark as Read"}
                      </button>
                      <button
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                        onClick={() => handleDeleteMessage(message._id || message.id)}
                      >
                        <i className="fas fa-trash"></i>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactMessagesWithSidebar;