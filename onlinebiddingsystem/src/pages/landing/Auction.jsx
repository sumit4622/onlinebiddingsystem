import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../../styles/Landing/acution.css';
import { Pagination, Navigation } from 'swiper/modules';

export default function Auction() {
  const [isMobile, setIsMobile] = useState(false);

  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    
    <div className="container py-5" id='Auction'>
        <h1 className=" text-center" style={{ zIndex:10 ,color:"black"}}>
  Featured Auctions
</h1>

      <Swiper
        centeredSlides={true}
        spaceBetween={30}
        pagination={{ type: 'fraction' }}
        navigation={true}
        modules={[Pagination, Navigation]}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
        }}
        className="mySwiper"
      >
       
        <SwiperSlide>
          {isMobile ? (
            // Mobile Design
            <div className="card text-center p-3">
              <div className="display-1 card-image">💰</div>
              <div className="card-body">
                <h5 className="card-title">Luxury Watch Set</h5>
                <p className="text-primary fw-bold">$5,200</p>
                <div className="badge bg-warning text-dark">3d 7h 25m</div>
              </div>
            </div>
          ) : (
            
            <div className="h-50">
              <div className="auction-card">
                <div className="card-image">💰</div>
                <div className="card-content">
                  <div className="card-title">Luxury Watch Set</div>
                  <div className="card-price">$5,200</div>
                  <div className="card-timer" id="timer1">3d 7h 25m</div>
                </div>
              </div>
            </div>
          )}
        </SwiperSlide>

        <SwiperSlide>
          {isMobile ? (
            <div className="card text-center p-3">
              <div className="display-1 card-image">⌚</div>
              <div className="card-body">
                <h5 className="card-title">Vintage Wristwatch</h5>
                <p className="text-primary fw-bold">$200</p>
                <div className="badge bg-warning text-dark">4h 4m</div>
              </div>
            </div>
          ) : (
            <div className="h-50">
              <div className="auction-card">
                <div className="card-image">⌚</div>
                <div className="card-content">
                  <div className="card-title">Luxury Watch Set</div>
                  <div className="card-price">$200</div>
                  <div className="card-timer" id="timer2">4h 4m</div>
                </div>
              </div>
            </div>
          )}
        </SwiperSlide>

       
        <SwiperSlide>
          {isMobile ? (
            <div className="card text-center p-3">
              <div className="display-1 card-image">🎨</div>
              <div className="card-body">
                
                <h5 className="card-title">Abstract Art Piece</h5>
                <p className="text-primary fw-bold">$50,200</p>
                <div className="badge bg-warning text-dark">4m</div>
                </div>
              </div>
            
          ) : (
            <div className="h-50">
              <div className="auction-card">
                <div className="card-image">🎨</div>
                <div className="card-content">
                  <div className="card-title">Luxury Watch Set</div>
                  <div className="card-price">$50,200</div>
                  <div className="card-timer" id="timer3">45m</div>
                </div>
              </div>
            </div>
          )}
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
