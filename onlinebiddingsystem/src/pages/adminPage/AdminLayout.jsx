import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { ShoppingCart, User, SquareChartGantt, Menu, X } from 'lucide-react';
import '../../styles/adminCSS/AdmunLayout.css';
import LogoutModal from '../login/LogoutModal';

export default function AdminLayout() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="admin-container">
      {/* Mobile Navbar */}
      <div className="mobile-navbar">
        <div className="mobile-navbar-content">
          <Button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
          <span className="mobile-navbar-title">Admin Panel</span>
        </div>
      </div>

      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={closeMobileMenu}
      ></div>

      <aside className={`admin-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <h4 className="admin-title">Admin Panel</h4>
          <Button className="mobile-close-btn d-lg-none" onClick={closeMobileMenu}>
            <X size={20} />
          </Button>
        </div>

        <div className="menu-section">
          <h6 className="menu-title">Menu</h6>
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/admin/admin-layout/dropped-bid" className="menu-link" onClick={closeMobileMenu}>
                <ShoppingCart className="menu-icon" />
                Dropped Bid
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/admin/admin-layout/manage-user" className="menu-link" onClick={closeMobileMenu}>
                <User className="menu-icon" />
                Manage User
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/admin/admin-layout/customer-review" className="menu-link" onClick={closeMobileMenu}>
                <SquareChartGantt className="menu-icon" />
                Customer Review
              </Link>
            </li>
          </ul>
        </div>

        <div className="logout-section">
          <button className="btn btn-outline-danger " onClick={() => setShowLogoutModal(true)}>
            Logout
          </button>
        </div>
      </aside>

      {/* This is the correct place to render route children */}
      <main className="main-content">
        <div className="content-area p-0">
          <Outlet />
        </div>
      </main>

      <LogoutModal show={showLogoutModal} handleClose={() => setShowLogoutModal(false)} />
    </div>
  );
}
