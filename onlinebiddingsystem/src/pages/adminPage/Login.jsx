import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/adminCSS/Login.css';

export default function Login() {
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const { username, password } = formValues;


    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem("user", JSON.stringify({ username }));
      navigate('/admin/admin-layout');
    } else {
      alert("Invalid credentials. Try: admin / admin123");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2 className="login-title">Admin Login</h2>
        <p className="login-subtitle">Online Bidding System</p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="login-input"
            value={formValues.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="login-input"
            value={formValues.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}
