import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from "../../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";

export default function LoginModal({ show, handleClose, setIsLoggedIn }) {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/api/token/", {
        username: username,
        password: password,
      });

      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh);

      setError(null);
      setIsLoggedIn(true);
      alert("Login successful!");

      handleClose();  
      navigate('/dashboard', { replace: true });

    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid username or password.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size='lg'>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3" controlId="inputUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="inputPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="rememberMe">
            <Form.Check
              type="checkbox"
              label="Remember me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          </Form.Group>

          {error && <Alert variant="danger">{error}</Alert>}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button type="submit" variant="primary">Log In</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
