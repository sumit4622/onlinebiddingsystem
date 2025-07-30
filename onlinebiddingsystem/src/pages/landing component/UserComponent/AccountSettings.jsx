import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

export default function AccountSetting() {
  const [isEditable, setIsEditable] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
    // Optional: save logic here
  };

  return (
    <div className="account-settings-container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="personal-info-card bg-white p-4 shadow rounded w-100" style={{ maxWidth: '600px' }}>
        <h5 className="section-title border-bottom pb-2 mb-4 fw-bold">Personal Info</h5>

        <Form>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={4}>First Name:</Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                disabled={!isEditable}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={4}>Last Name:</Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                disabled={!isEditable}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={4}>Email:</Form.Label>
            <Col sm={8}>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                disabled={!isEditable}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4">
            <Form.Label column sm={4}>Password:</Form.Label>
            <Col sm={8}>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                disabled={!isEditable}
              />
            </Col>
          </Form.Group>

          <div className="edit-button-container d-flex justify-content-end">
            <Button variant={isEditable ? 'primary' : 'outline-dark'} onClick={toggleEdit}>
              {isEditable ? 'Save' : 'Edit'}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
