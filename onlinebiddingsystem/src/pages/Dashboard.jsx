import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Header from './landing component/Header';
import LogoutModal from "./login/LogoutModal";
import SureModal from '../landingPage/Components/SureModal';
import { useNavigate } from 'react-router-dom';
import { fetchApprovedBid } from '../services/userServices';
import TimeCompact from './Support/compactTime';

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
      const response = await fetchApprovedBid();
      const approved = response.filter(item => item.is_approved);
      setApprovedBids(approved);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("error:", error.message);
        alert('Error:', error.message);
      }
      console.error("Error fetching data:", error);
    }
  }

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

  const handleBidClick = (item) => {
    setActiveBidIndex(item);
  };

  const handleCloseBidModal = () => {
    setActiveBidIndex(null);
  };

  const handleContinueBid = () => {
    setActiveBidIndex(null);
    navigate(`/auction/${activeBidIndex.id}`, { state: { item: activeBidIndex } });
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
          {approvedBids.map((item) => (
            <div key={item.id} className="col-sm-6 col-md-4 col-lg-4 gx-5 mb-4 mt-4">
              <div className="card h-100">
                <div className="card-body">
                  <img
                    src={`http://localhost:8000${item.image}`}
                    alt="Auction Item"
                    style={{ width: '100%', height: '12rem' }}
                  />
                  <h5 className="card-title">{item.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{item.description}</h6>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <p className='fw-bold mb-0'>Rs: {item.minimum_bid}</p>
                    <TimeCompact end={item.end_date} />
                  </div>

                  <hr />
                  <button className='btn btn-dark' style={{ backgroundColor: '#3C3C43' }} onClick={() => handleBidClick(item)}>Start Bid</button>

                  {activeBidIndex === item && (
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
