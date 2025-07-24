import { useEffect, useState } from "react";
import RegisterModal from "../../pages/login/RegisterModal.jsx";
import LoginModal from "../../pages/login/LoginModal.jsx";
import LogoutModal from "../login/LogoutModal.jsx";
import { ACCESS_TOKEN } from "../../constants.js";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    setIsLoggedIn(!!token);
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <a className="navbar-brand" href="#Home">Online Bidding</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item active">
              <a className="nav-link" href="#current">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#Auction">Auction</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#!" role="button" data-bs-toggle="dropdown">
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#Contact">Contact Us</a></li>
                <li><a className="dropdown-item" href="#join">Join Us</a></li>
              </ul>
            </li>
          </ul>

          <form className="d-flex gap-2">
            <input className="form-control me-2" type="search" placeholder="Search" />
            <button className="btn btn-outline-primary" type="submit">Search</button>

            {isLoggedIn ? (
              <>
                <button
                  className="btn btn-outline-danger"
                  type="button"
                  onClick={() => setShowLogoutModal(true)}
                >
                  Logout
                </button>

                <div className="profile">
                  

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
          </form>
        </div>
      </nav>

      {/* Modals */}
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
