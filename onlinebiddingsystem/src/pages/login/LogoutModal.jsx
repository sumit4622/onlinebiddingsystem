import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';

export default function LogoutModal({ show, handleClose, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();

    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);

    if (setIsLoggedIn) {
      setIsLoggedIn(false);
    }

    handleClose(); 
    navigate('/');
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Log Out</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to log out?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleLogout}>
          Log Out
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
