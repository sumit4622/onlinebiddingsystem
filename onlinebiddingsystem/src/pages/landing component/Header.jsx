import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterModal from "../../pages/login/RegisterModal.jsx";
import LoginModal from "../../pages/login/LoginModal.jsx";
import LogoutModal from "../login/LogoutModal.jsx";
import { ACCESS_TOKEN } from "../../constants.js";
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from "antd";
import '../../App.css';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => navigate('/UserProfile');
  const handleHomeNavigate = () => navigate('/');
  const handleAuctionNavigate = () => navigate('/dashboard');

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    setIsLoggedIn(!!token);
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top px-3">
        <a className="navbar-brand" style={{ cursor: "pointer" }}>Online Bidding</a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">


          <ul className="navbar-nav mb-2 mb-lg-0">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" onClick={handleAuctionNavigate} style={{ cursor: "pointer" }}>
                    Auction
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link" onClick={handleHomeNavigate} style={{ cursor: "pointer" }}>
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={handleAuctionNavigate} style={{ cursor: "pointer" }}>
                    Auction
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#Contact">
                    Contact Us
                  </a>
                </li>
              </>
            )}
          </ul>


          <div className="ms-auto d-flex align-items-center gap-3">

            {isLoggedIn ? (
              <>
                <input className="form-control" type="search" placeholder="Search" />
                <button className="btn btn-outline-primary">Search</button>

                <button
                  className="btn btn-outline-danger"
                  onClick={() => setShowLogoutModal(true)}
                >
                  Logout
                </button>

                <div className="profile ">
                  <Avatar onClick={handleNavigate} style={{ backgroundColor: '#87d068' }} size={"large"} icon={<UserOutlined />} />
                </div>
              </>
            ) : (
              <>
                <button
                  className="btn btn-outline-primary"
                  type="button"
                  onClick={() => setShowLoginModal(true)}
                >
                  Login
                </button>

                <button
                  className="btn btn-outline-primary"
                  type="button"
                  onClick={() => setShowRegisterModal(true)}
                >
                  SignUp
                </button>
              </>
            )}

          </div>
        </div>
      </nav>

      {/* MODALS */}
      <LoginModal
        show={showLoginModal}
        handleClose={() => setShowLoginModal(false)}
        setIsLoggedIn={setIsLoggedIn}
      />

      <RegisterModal
        show={showRegisterModal}
        handleClose={() => setShowRegisterModal(false)}
      />

      <LogoutModal
        show={showLogoutModal}
        handleClose={() => setShowLogoutModal(false)}
        setIsLoggedIn={setIsLoggedIn}
      />
    </>
  );
}
