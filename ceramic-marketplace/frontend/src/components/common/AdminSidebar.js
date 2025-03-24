import { Link } from "react-router-dom";
import styles from "../../styles/AdminDashboard.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const AdminSidebar = () => {
  return (
    <nav className={styles.sidebar}>
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
          <Link to="/view-statistics">
            <i className="fas fa-chart-line"></i> View Statistics
          </Link>
        </li>
        <li>
          <Link to="/contact-messages">
            <i className="fas fa-envelope"></i> Contact Messages
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminSidebar;