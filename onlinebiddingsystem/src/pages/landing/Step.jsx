import React from 'react';

export default function Step() {
  return (
    <div>
      <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <h2 className="text-center text-dark mb-5">Why Choose Us?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div
                className="bg-white p-4 rounded-4 text-center h-100 shadow-sm feature-card"
                style={{ transition: 'all 0.3s ease' }}
              >
                <div className="feature-icon display-4 text-primary mb-3">🔒</div>
                <h3 className="fs-4 fw-semibold text-dark mb-2">Secure Bidding</h3>
                <p className="text-muted">Advanced encryption and fraud protection keep your transactions safe</p>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="bg-white p-4 rounded-4 text-center h-100 shadow-sm feature-card"
                style={{ transition: 'all 0.3s ease' }}
              >
                <div className="feature-icon display-4 text-primary mb-3">⚡</div>
                <h3 className="fs-4 fw-semibold text-dark mb-2">Real-Time Updates</h3>
                <p className="text-muted">Get instant notifications and live bid updates as they happen</p>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="bg-white p-4 rounded-4 text-center h-100 shadow-sm feature-card"
                style={{ transition: 'all 0.3s ease' }}
              >
                <div className="feature-icon display-4 text-primary mb-3">✅</div>
                <h3 className="fs-4 fw-semibold text-dark mb-2">Verified Sellers</h3>
                <p className="text-muted">All sellers are thoroughly vetted to ensure authenticity</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
