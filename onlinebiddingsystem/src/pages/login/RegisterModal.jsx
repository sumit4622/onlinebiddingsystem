import React, { useState } from 'react';
import api from '../../api';

export default function RegisterModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setusername] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      username,
      email,
      password,
      first_name,
      last_name,
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
                <div className="form-group col-md-3">
                  <label htmlFor="firstname">First Name</label>
                  <input type="text"
                    className='form-control'
                    id='inputFirstName'
                    placeholder='First Name'
                    value={first_name}
                    onChange={(e) => setfirst_name(e.target.value)} />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="firstname">Last Name</label>
                  <input type="text"
                    className='form-control'
                    id='inputLasttName'
                    placeholder='Last Name'
                    value={last_name}
                    onChange={(e) => setlast_name(e.target.value)} />
                </div>
              </div>

              <div className="row">

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

