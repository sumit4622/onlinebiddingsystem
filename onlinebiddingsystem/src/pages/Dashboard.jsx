import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Header from './landing component/Header';
import LogoutModal from "./login/LogoutModal";
import SureModal from '../landingPage/Components/SureModal';
import { useNavigate } from 'react-router-dom';
import api from "../api"; // Your axios config

export default function Dashboard() {
  const [sortBy, setSortBy] = useState('');
  const [showAuctionModal, setShowAuctionModal] = useState(false); 
  const [activeBidIndex, setActiveBidIndex] = useState(null); 
  const [approvedBids, setApprovedBids] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchApprovedBids();
  }, []);

  const fetchApprovedBids = async () => {
    try {
      const res = await api.get("/api/items/");
      const approved = res.data.filter(item => item.is_approved); // Adjust if field name differs
      setApprovedBids(approved);
    } catch (err) {
      console.error("Failed to fetch approved bids", err);
    }
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleCreateAuctionClick = () => {
    setShowAuctionModal(true);
  };

  const handleCloseAuctionModal = () => {
    setShowAuctionModal(false);
  };

  const handleContinueAuction = () => {
    setShowAuctionModal(false);
    navigate('/UserProfile/upload');
  };

  const handleBidClick = (index) => {
    setActiveBidIndex(index);
  };

  const handleCloseBidModal = () => {
    setActiveBidIndex(null);
  };

  const handleContinueBid = () => {
    setActiveBidIndex(null);
    navigate('/auction');
  };

  return (
    <>
      <LogoutModal />
      <Header />

      <div className='py-5' style={{ backgroundColor: '#004663' }}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center ">
            <h1 className="text-white fw-bold mb-0 m-3"
              style={{
                fontFamily: "fw-bold",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                minWidth: "fit-content"
              }}>
              Auctions
            </h1>

            <Form.Group controlId="sortBySelect" className="mb-0 mt-3" style={{ width: '14rem', minWidth: '14rem' }}>
              <Form.Select value={sortBy} onChange={handleSortChange}>
                <option value="" disabled hidden>Sort By</option>
                <option value="latest">Latest</option>
                <option value="week">Previous Week</option>
                <option value="month">Previous Month</option>
                <option value="retired">Retired</option>
              </Form.Select>
            </Form.Group>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className="row">
          {approvedBids.map((item, index) => (
            <div key={item.id} className="col-sm-6 col-md-4 col-lg-4 gx-5 mb-4 mt-4">
              <div className="card h-100">
                <div className="card-body">
                  <img
                    src={`http://localhost:8000${item.image}`}
                    alt="Auction Item"
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <h5 className="card-title">{item.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{item.description}</h6>
                  <p className='text-justify'>Auction Duration: {item.start_date} to {item.end_date}</p>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <p className='fw-bold mb-0'>Rs: {item.minimum_bid}</p>
                    <div className="Duration rounded-pill pt-2 pb-2 px-lg-3 text-white flex-shrink-0" style={{ backgroundColor: '#3C3C43' }}>
                      <p className='mb-0'>Check Auction Page</p>
                    </div>
                  </div>
                  <hr />
                  <button className='btn btn-dark' style={{ backgroundColor: '#3C3C43' }} onClick={() => handleBidClick(index)}>Start Bid</button>

                  {activeBidIndex === index && (
                    <SureModal onClose={handleCloseBidModal} onContinue={handleContinueBid} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className='btn btn-dark text-light rounded-pill position-fixed floating-button'
        style={{ backgroundColor: '#3C3C43', width: '10rem', height: '3rem', bottom: '20px', right: '80px' }}
        onClick={handleCreateAuctionClick}
      >
        Create Auction
      </button>

      {showAuctionModal && (
        <SureModal onClose={handleCloseAuctionModal} onContinue={handleContinueAuction} />
      )}
    </>
  );
}
