import React from 'react';
import '../../styles/Landing/Works.css'; 

export default function Works() {
  return (
    <div>
      <section className="py-5" id="about">
        <div className="container">
          <h2 className="text-center mb-5">How It Works</h2>
          <div className="row g-4">
            <div className="col-md-3 col-sm-6">
              <div className="text-center step">
                <div
                  className="step-icon mx-auto mb-3"
                  style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    color: 'white',
                    transition: 'all 0.3s ease',
                  }}
                >
                  1
                </div>
                <h3 className="fs-5 fw-semibold text-dark">Register</h3>
                <p className="text-muted">Create your account in seconds and get verified to start bidding</p>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="text-center step">
                <div className="step-icon mx-auto mb-3">📋</div>
                <h3 className="fs-5 fw-semibold text-dark">Browse Auctions</h3>
                <p className="text-muted">Explore thousands of items across multiple categories</p>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="text-center step">
                <div className="step-icon mx-auto mb-3">✓</div>
                <h3 className="fs-5 fw-semibold text-dark">Place Bids</h3>
                <p className="text-muted">Bid confidently with our secure and transparent system</p>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="text-center step">
                <div className="step-icon mx-auto mb-3">🏆</div>
                <h3 className="fs-5 fw-semibold text-dark">Win</h3>
                <p className="text-muted">Get your items delivered safely and securely</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
