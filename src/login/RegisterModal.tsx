import React, { useState } from 'react';
import api from '../api'; // Make sure this path is correct

export function RegisterModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setusername] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Kathmandu");
  const [zip, setZip] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      username,
      email,
      password,
      address,
      city,
      state,
      zip,
    };

    try {
      const response = await api.post('api/user/register/', payload);
      console.log('Registration successful:', response.data);
      alert('Registration successful!');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div
      className="modal fade"
      id="registerModal"
      tabIndex={-1}
      aria-labelledby="registerModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <form className="p-2" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title" id="registerModalLabel">Register</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputEmail4">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail4"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputPassword4">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputUsername">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputUsername"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputAddress">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  placeholder="1234 Main St"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputCity">City</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputCity"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="inputState">State</label>
                  <select
                    id="inputState"
                    className="form-control"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  >
                    <option>Kathmandu</option>
                    <option>Pokhara</option>
                  </select>
                </div>
                <div className="form-group col-md-2 pb-4">
                  <label htmlFor="inputZip">Zip</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputZip"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
