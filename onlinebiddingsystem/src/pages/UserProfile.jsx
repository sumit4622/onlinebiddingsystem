import { Outlet, NavLink } from "react-router-dom";
import Header from './landing component/Header';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from "antd";

export default function UserProfile() {
  return (
    <>
      <Header />
      
      {/* Hero Section - Enhanced */}
      <div className='py-5' style={{ backgroundColor: '#004663' }}>
        <div className="container">
          <h1 className="text-white fw-bold m-3"
            style={{ 
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: '700',
              letterSpacing: '-0.02em'
            }}>
            My account
          </h1>
        </div>
      </div>

      {/* Main Content Area - Redesigned Layout */}
      <div className="container-fluid" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <div className="row g-0">
          
          
          <div className="col-auto" style={{ width: '350px', backgroundColor: 'white', minHeight: '100vh' }}>
            <div className="p-4">
              
              
              <div className="d-flex align-items-center gap-3 mb-4">
                <Avatar style={{ backgroundColor: '#87d068' }} size={80} icon={<UserOutlined />} /> 
                <div>
                  <div className="fw-bold fs-5 mb-1" style={{ color: '#212529' }}>
                    John Appleseed
                  </div>
                  <div className="text-muted" style={{ fontSize: '14px' }}>
                    john.appleseed@gmail.com
                  </div>
                </div>
              </div>

              {/* Divider */}
              <hr style={{ margin: '1.5rem 0', borderColor: '#dee2e6' }} />

              {/* Navigation Menu - Enhanced */}
              <nav className="nav flex-column">
                <NavLink 
                  to="bidding" 
                  className={({ isActive }) => 
                    `nav-link px-0 py-3 d-flex align-items-center gap-2 text-decoration-none ${
                      isActive 
                        ? 'fw-bold active-nav-link' 
                        : 'text-dark nav-link-default'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && <span style={{ color: '#0066cc' }}>→</span>}
                      Bidding History
                    </>
                  )}
                </NavLink>

                <NavLink 
                  to="settings" 
                  className={({ isActive }) => 
                    `nav-link px-0 py-3 d-flex align-items-center gap-2 text-decoration-none ${
                      isActive 
                        ? 'fw-bold active-nav-link' 
                        : 'text-dark nav-link-default'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && <span style={{ color: '#0066cc' }}>→</span>}
                      Account Setting
                    </>
                  )}
                </NavLink>

                <NavLink 
                  to="upload" 
                  className={({ isActive }) => 
                    `nav-link px-0 py-3 d-flex align-items-center gap-2 text-decoration-none ${
                      isActive 
                        ? 'fw-bold active-nav-link' 
                        : 'text-dark nav-link-default'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && <span style={{ color: '#0066cc' }}>→</span>}
                      Upload item
                    </>
                  )}
                </NavLink>
              </nav>
            </div>
          </div>

          
          <div className="col">
            <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
              <div 
                className="bg-white rounded shadow-sm p-4" 
                style={{ 
                  minHeight: '600px',
                  border: '1px solid #e9ecef'
                }}
              >
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>

      
      
    </>
  );
}