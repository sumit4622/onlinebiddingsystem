import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/adminCSS/Login.css';
import adminapi from '../../adminapi';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../adminConstants';

export default function Login() {
  const [formValues, setFormValues] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await adminapi.post("admin-login/", formValues);

      const { access, refresh } = response.data;
      if (!access) throw new Error("No access token returned");

      // Save tokens
      localStorage.setItem(ACCESS_TOKEN, access);
      localStorage.setItem(REFRESH_TOKEN, refresh);

      alert("Login successful!");
      navigate("/admin/admin-layout/dropped-bid");
    } catch (error) {
      console.error(error);
      alert("Login failed. Check credentials and try again.");
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
