import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { fetchApprovedBid } from "../../services/userServices";
import TimeCompact from '../Support/compactTime';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../../styles/Landing/acution.css';
import LoginModal from '../../pages/login/LoginModal';
import { useNavigate } from 'react-router-dom';

export default function Auction() {
  const [showAuction, setShowAuction] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const fetchApprovedBids = async () => {
    try {
      const response = await fetchApprovedBid();
      const approved = response.filter(item => item.is_approved);
      setShowAuction(approved);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response) {
        console.error("Server Response:", error.response.data);
      } else if (error.request) {
        console.error("No Response Received:", error.request);
      } else {
        alert('Error: ' + error.message);
      }
    }
  };

  useEffect(() => {
    fetchApprovedBids();
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (token) setIsLoggedIn(true);
  }, []);

  const handleBidClick = (item) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (!token) {
      setShowLoginModal(true);
      return;
    }
  };


  return (
    <>
      <div className="container py-5" id="Auction">
        <h1 className="text-center" style={{ color: "black" }}>
          Featured Auctions
        </h1>

        <Swiper
          spaceBetween={35}
          pagination={{ type: 'fraction' }}
          navigation={true}
          modules={[Pagination, Navigation]}
          autoHeight={true}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 15 },
            768: { slidesPerView: 2, spaceBetween: 25 },
            992: { slidesPerView: 3, spaceBetween: 35 },
          }}
          className="mySwiper"
        >
          {showAuction.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="card h-100 mb-4 mt-4">
                <div className="card-body">
                  <img
                    src={`http://20.40.56.69:8000${item.image}`}
                    alt={item.title}
                    style={{ width: '100%', height: '12rem', objectFit: 'cover' }}
                  />
                  <h5 className="card-title mt-3">{item.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{item.description}</h6>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <p className="fw-bold mb-0">Rs: {item.minimum_bid}</p>
                    <TimeCompact end={item.end_date} />
                  </div>
                  <hr />
                  <button
                    className="btn btn-dark"
                    style={{ backgroundColor: '#3C3C43' }}
                    onClick={() => handleBidClick(item)}
                  >
                    Start Bid
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <LoginModal
        show={showLoginModal}
        handleClose={() => setShowLoginModal(false)}
        setIsLoggedIn={setIsLoggedIn}
      />
    </>
  );
}
