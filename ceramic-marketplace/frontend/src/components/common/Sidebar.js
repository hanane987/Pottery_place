import { Home, Package, ShoppingBag, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activeSection, setActiveSection, mobileMenuOpen, setMobileMenuOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <aside className={`sidebar ${mobileMenuOpen ? "mobile-open" : ""}`}>
      <div className="sidebar-header">
        <h1>Pottery Studio</h1>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li className={activeSection === "dashboard" ? "active" : ""}>
            <button onClick={() => {
              setActiveSection("dashboard");
              navigate("/vendor/dashboard");
            }}>
              <Home size={20} />
              <span>Dashboard</span>
            </button>
          </li>
          <li className={activeSection === "products" ? "active" : ""}>
            <button onClick={() => {
              setActiveSection("products");
              navigate("/vendor/products");
            }}>
              <Package size={20} />
              <span>Products</span>
            </button>
          </li>
          <li className={activeSection === "orders" ? "active" : ""}>
            <button onClick={() => {
              setActiveSection("orders");
              navigate("/vendor/orders");
            }}>
              <ShoppingBag size={20} />
              <span>Orders</span>
            </button>
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;