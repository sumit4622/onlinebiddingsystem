import  RegisterModal  from "../../pages/login/RegisterModal.jsx";
import  LoginModal  from "../../pages/login/LoginModal.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


export default function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="Home">Online Bidding</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item active">
              <a className="nav-link" href="current">
                Home <span className="visually-hidden">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="Abountus">About us</a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="lulul"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="lulu">Action</a></li>
                <li><a className="dropdown-item" href="lulu">Another action</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="something">Something else here</a></li>
              </ul>
            </li>
          </ul>
          <form className="d-flex gap-2">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-primary" type="submit">Search</button>
            <button
              className="btn btn-outline-primary"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#LoginModal"
            >
              Login
            </button>
            <button
              className="btn btn-outline-primary"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#registerModal"
            >
              SignUp
            </button>
          </form>
        </div>
      </nav>
      <RegisterModal />
      <LoginModal />
    </>
  );
}

