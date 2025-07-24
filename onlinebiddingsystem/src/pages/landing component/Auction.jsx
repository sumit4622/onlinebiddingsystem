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
      <h1 className=" text-center" style={{ zIndex: 10, color: "black" }}>
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
            <div className="card" style={{width:'18rem'}}>
              <div className="Picture display-1 card-image">💰</div>
              <div className="card-body">
                <h5 className="card-tittle">Luxury Watch Set</h5>
                <p className='card-subtittle mb-2 text-muted'> This is watch we want</p>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                    <p className='fw-bold mb-0'>Rs: 4000</p>
                    <div className="Duration bg-dark rounded-pill pt-2 pb-2 px-3  text-white">
                      <p className='mb-0'>2d 7hr 40min</p>
                    </div>
                  </div>
                  <hr />
                  <button className='btn btn-dark'>Start Bid</button>
              </div>
            </div>
          ) : (

            <div className="card" style={{width:'18rem'}}>
              <div className="Picture display-1 card-image">💰</div>
              <div className="card-body">
                <h5 className="card-tittle">Luxury Watch Set</h5>
                <p className='card-subtittle mb-2 text-muted'> This is watch we want</p>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                    <p className='fw-bold mb-0'>Rs: 4000</p>
                    <div className="Duration bg-dark rounded-pill pt-2 pb-2 px-3  text-white">
                      <p className='mb-0'>2d 7hr 40min</p>
                    </div>
                  </div>
                  <hr />
                  <button className='btn btn-dark'>Start Bid</button>
              </div>
            </div>
          )}
        </SwiperSlide>

        <SwiperSlide>
          {isMobile ? (
            <div className="card" style={{width:'18rem'}}>
              <div className="Picture display-1 card-image">💰</div>
              <div className="card-body">
                <h5 className="card-tittle">Luxury Watch Set</h5>
                <p className='card-subtittle mb-2 text-muted'> This is watch we want</p>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                    <p className='fw-bold mb-0'>Rs: 4000</p>
                    <div className="Duration bg-dark rounded-pill pt-2 pb-2 px-3  text-white">
                      <p className='mb-0'>2d 7hr 40min</p>
                    </div>
                  </div>
                  <hr />
                  <button className='btn btn-dark'>Start Bid</button>
              </div>
            </div>
          ) : (
            <div className="card" style={{width:'18rem'}}>
              <div className="Picture display-1 card-image">💰</div>
              <div className="card-body">
                <h5 className="card-tittle">Luxury Watch Set</h5>
                <p className='card-subtittle mb-2 text-muted'> This is watch we want</p>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                    <p className='fw-bold mb-0'>Rs: 4000</p>
                    <div className="Duration bg-dark rounded-pill pt-2 pb-2 px-3  text-white">
                      <p className='mb-0'>2d 7hr 40min</p>
                    </div>
                  </div>
                  <hr />
                  <button className='btn btn-dark'>Start Bid</button>
              </div>
            </div>
          )}
        </SwiperSlide>


        <SwiperSlide>
          {isMobile ? (
            <div className="card" style={{width:'18rem'}}>
              <div className="Picture display-1 card-image">💰</div>
              <div className="card-body">
                <h5 className="card-tittle">Luxury Watch Set</h5>
                <p className='card-subtittle mb-2 text-muted'> This is watch we want</p>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                    <p className='fw-bold mb-0'>Rs: 4000</p>
                    <div className="Duration bg-dark rounded-pill pt-2 pb-2 px-3  text-white">
                      <p className='mb-0'>2d 7hr 40min</p>
                    </div>
                  </div>
                  <hr />
                  <button className='btn btn-dark'>Start Bid</button>
              </div>
            </div>

          ) : (
            <div className="card" style={{width:'18rem'}}>
              <div className="Picture display-1 card-image">💰</div>
              <div className="card-body">
                <h5 className="card-tittle">Luxury Watch Set</h5>
                <p className='card-subtittle mb-2 text-muted'> This is watch we want</p>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                    <p className='fw-bold mb-0'>Rs: 4000</p>
                    <div className="Duration bg-dark rounded-pill pt-2 pb-2 px-3  text-white">
                      <p className='mb-0'>2d 7hr 40min</p>
                    </div>
                  </div>
                  <hr />
                  <button className='btn btn-dark'>Start Bid</button>
              </div>
            </div>
          )}
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
