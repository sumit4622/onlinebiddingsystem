import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { getuserUpdate, userUpdate } from '../../../services/userServices';

export default function AccountSetting() {
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getuserUpdate(); 
        const data = response.data;

        setFormData({
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          email: data.email || '',
          password: '',
        });
      } catch (error) {
        console.error("Error fetching user:", error);
        alert("Unable to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const toggleEdit = async () => {
    if (isEditable) {
      // When saving
      try {
        const updateResponse = await userUpdate(formData);
        alert("Profile updated successfully!");

      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile.");
      }
    }

    setIsEditable(!isEditable);
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;

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
                disabled={!isEditable}
              />
            </Col>
          </Form.Group>

          {/* <Form.Group as={Row} className="mb-4">
            <Form.Label column sm={4}>Password:</Form.Label>
            <Col sm={8}>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Leave blank to keep current password"
                disabled={!isEditable}
              />
            </Col>
          </Form.Group> */}

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
