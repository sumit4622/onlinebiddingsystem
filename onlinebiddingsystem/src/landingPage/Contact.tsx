import React from 'react'
import '../styles/Landing/Contact.css'; 

export default function Contact() {
  return (
    <div>
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #2c3e50, #34495e)', color: 'white' }}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-md-6">
              <h2>Contact Us</h2>
              <p>Have questions? We're here to help you succeed in your bidding journey.</p>
            </div>
            <div className="col-md-6">
              <form
                className="p-4 rounded-4"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control bg-transparent text-white border-light"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control bg-transparent text-white border-light"
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control bg-transparent text-white border-light"
                    placeholder="Your Message"
                    rows="5"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn w-100"
                  style={{
                    backgroundColor: '#667eea',
                    color: 'white',
                    borderRadius: '10px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = '#5a67d8')}
                  onMouseOut={(e) => (e.target.style.backgroundColor = '#667eea')}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
