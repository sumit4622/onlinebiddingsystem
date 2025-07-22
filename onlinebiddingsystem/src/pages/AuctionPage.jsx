import Header from "./landing component/Header"
import { Button } from "react-bootstrap";

import SanImage from "../assets/SAN.png";
import HigestBid from "./landing component/PagesComponents/HigestBid";


export default function AuctionPage() {
  return (
    <>
      <Header />
      <div className="d-flex" style={{ marginTop: '4rem' }}>
        <div className="imgcontainer">
          <img src={SanImage} alt=" san image" style={{ width: '650px', height: 'auto' }} />
        </div>
        <div className="infoContainer ">
          <h1 className="headerTittle"> SAN </h1>
          <h6 className="author"> By Ranjech Thakur</h6>
          <div className="amount">
            <h5 className="biddingamount text-primary">Current Bid</h5>
            <div className="amount text-primary">6000</div>
          </div>
          <h6 className="tittle bold">Time left:</h6>
          <div className="timeleft d-flex gap-3">

            <div className="hour text-center">
              <div className="days d-flex justify-content-center align-items-center"
              style={{
                height: '4rem',
                width: '5rem',
                backgroundColor: '#004663',
                color: 'white'
              }}
            >
              45
            </div>
              Days
            </div>

            <div className="Second text-center">
            <div
              className="hours d-flex justify-content-center align-items-center"
              style={{
                height: '4rem',
                width: '5rem',
                backgroundColor: '#004663',
                color: 'white'
              }}
            >
              <p>45</p>
            </div>
            Hours
            </div>

            <div className="Second text-center"><div
              className="Minu d-flex justify-content-center align-items-center"
              style={{
                height: '4rem',
                width: '5rem',
                backgroundColor: '#004663',
                color: 'white'
              }}
            >
              <p>45</p>
            </div>
            Minute
            </div>


            <div className="Second text-center"><div
              className="Secon d-flex justify-content-center align-items-center"
              style={{
                height: '4rem',
                width: '5rem',
                backgroundColor: '#004663',
                color: 'white'
              }}
            >
              <p>45</p>
            </div>
            Second
            </div>
          </div>
          <div className="endDate">
            <p className="bold"> Auction ends: 16.4.2023  08:05:33 PM</p>
          </div>
          <hr />
          <div className="bidAmouont d-flex gap-2 align-items-center">
            <div className="title "><h6 className="mb-0">Your bid</h6></div>
            <div className="stepper"><label for="quantity">RS:</label>
              <input type="number" id="quantity" name="quantity" min="0" max="100" step="1" value="1" /></div>
            <div className="button-container">
              <Button variant="dark" >Bid</Button>
            </div>
          </div>

        </div>
      </div >
      <HigestBid />
    </>
  )
}
