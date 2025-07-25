import React from 'react';

export default function AccountSetting() {
  return (
    <div className="account-settings-container">
      {/* Personal Info Card */}
      <div className="personal-info-card">
        <h5 className="section-title">Personal Info</h5>
        
        <div className="info-grid">
          <div className="info-row">
            <div className="info-item">
              <span className="info-label">First name:</span>
              <span className="info-value">Sumit</span>
            </div>
          </div>
          
          <div className="info-row">
            <div className="info-item">
              <span className="info-label">Last name:</span>
              <span className="info-value">Ray</span>
            </div>
          </div>
          
          <div className="info-row">
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">Sumit.ray@gmail.com</span>
            </div>
          </div>
          
          <div className="info-row">
            <div className="info-item">
              <span className="info-label">Password:</span>
              <span className="info-value">••••••</span>
            </div>
          </div>
        </div>
        
        <div className="edit-button-container">
          <button className="edit-button">Edit</button>
        </div>
      </div>

      <style jsx>{`
        .account-settings-container {
          padding: 0;
          max-width: 600px;
        }

        .personal-info-card {
          background-color: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          padding: 2rem;
          position: relative;
        }

        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #212529;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #dee2e6;
        }

        .info-grid {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .info-row {
          display: flex;
          align-items: center;
        }

        .info-item {
          display: flex;
          width: 100%;
          align-items: center;
        }

        .info-label {
          font-weight: 600;
          color: #495057;
          font-size: 14px;
          min-width: 120px;
          margin-right: 1rem;
        }

        .info-value {
          color: #212529;
          font-size: 14px;
          flex: 1;
        }

        .edit-button-container {
          display: flex;
          justify-content: flex-end;
          margin-top: 2rem;
        }

        .edit-button {
          background-color: transparent;
          border: 1px solid #6c757d;
          color: #495057;
          padding: 0.5rem 1.5rem;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .edit-button:hover {
          background-color: #495057;
          color: white;
          border-color: #495057;
        }

        @media (max-width: 768px) {
          .personal-info-card {
            padding: 1.5rem;
          }
          
          .info-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.25rem;
          }
          
          .info-label {
            min-width: auto;
            margin-right: 0;
          }
        }
      `}</style>
    </div>
  );
}