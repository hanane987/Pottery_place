import { Search, Bell } from "lucide-react";

const TopNav = ({ searchTerm, setSearchTerm, mobileMenuOpen, setMobileMenuOpen }) => {
  return (
    <header className="top-nav">
      <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className="search-container">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="nav-actions">
        <button className="notification-btn">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>
        <div className="user-profile">
          <img src="/placeholder.svg?height=40&width=40" alt="User" />
          <div className="user-info">
            <p className="user-name">Vendor Name</p>
            <p className="user-role">Vendor</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;