import Header from "./landing component/Header";
import { useState } from "react";
import { Button } from "react-bootstrap";


import SanImage from "../assets/SAN.png";
import HigestBid from "./landing component/PagesComponents/HigestBid";

export default function AuctionPage() {
  const [value, setValue] = useState(500);

  const minBid = 500;
  const maxBid = 10000;
  const bidIncrement = 100;

  const handleInputChange = (event) => {
    const newValue = parseInt(event.target.value, 10);

    if (!isNaN(newValue) && newValue >= minBid && newValue <= maxBid) {
      setValue(newValue);
    } else if (isNaN(newValue) || event.target.value === '') {
      setValue(minBid);
    } else if (newValue < minBid) {
      setValue(minBid);
    } else if (newValue > maxBid) {
      setValue(maxBid);
    }
  };

  const handleBid = () => {
    const nextValue = value + bidIncrement;
    if (nextValue <= maxBid) {
      setValue(nextValue);
    } else {
      setValue(maxBid);
    }
  };

  return (
    <>
      <Header />
      <div className=" container d-flex justify-content-md-around" style={{ marginTop: '4rem' }}>
        <div className="imgcontainer">
          <img src={SanImage} alt="BidImage" style={{ width: '650px', height: 'auto' }} />
        </div>
        <div className="infoContainer ">
          <h1 className="headerTittle fs-1 fw-bold"> SAN </h1>
          <h6 className="author fs-3 fst-italic"> By Ranjech Thakur</h6>

          <div className="amount">
            <h5 className="biddingamount fs-4 text-primary">Current Bid</h5>
            <div className="amount fs-4 text-primary">6000</div>
          </div>
          <h6 className="tittle bold">Time left:</h6>
          <div className="timeleft d-flex gap-3">
            {['Days', 'Hours', 'Minute', 'Second'].map((label, i) => (
              <div key={i} className="text-center">
                <div className="d-flex fs-3 justify-content-center align-items-center"
                  style={{
                    height: '4rem',
                    width: '5rem',
                    backgroundColor: '#004663',
                    color: 'white'
                  }}>
                  45
                </div>
                {label}
              </div>
            ))}
          </div>

          <div className="endDate d-flex gap-2">
            <p className="fw-bold"> Auction ends:</p>
            <p> 16.4.2023  08:05:33 PM</p>
          </div>

          <hr />

          <div className="bidAmouont d-flex gap-2 align-items-center">
            <div className="title">
              <h6 className="mb-0">Your bid</h6>
            </div>
            <div className="stepper">
              <label htmlFor="quantity">RS:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min={minBid}
                max={maxBid}
                step="1"
                value={value}
                onChange={handleInputChange}
              />
            </div>
            <div className="button-container">
              <Button variant="dark" onClick={handleBid}>Bid</Button>
            </div>
          </div>
        </div>
      </div>
      <HigestBid />
    </>
  );
}
