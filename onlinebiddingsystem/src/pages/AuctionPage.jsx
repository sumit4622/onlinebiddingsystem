import Header from "./landing component/Header";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import HigestBid from "./landing component/PagesComponents/HigestBid";
import TimeBoxes from "./Support/BoxTime";
import { placeBid, fetch_latestbid } from "../services/userServices";
import BidModel from "../landingPage/Components/BidModel";

export default function AuctionPage() {
  const [value, setValue] = useState(null);
  const [showAuctionModal, setShowAuctionModal] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const item = location.state?.item;

  const bidIncrement = 100;

  
  useEffect(() => {
    const fetchLatestBid = async () => {
      try {
        const data = await fetch_latestbid(id);
        setValue(data.latest_bid_amount);
      } catch (error) {
        console.log("Failed to fetch latest bid, defaulting to item minimum bid.");
        setValue(0);
      }
    };
    fetchLatestBid();
  }, [id, item]);

 
  const handleInputChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue)) {
      setValue(newValue);
    }
  };

  
  const handleBidClick = () => {
    setValue(prev => prev + bidIncrement);
    setShowAuctionModal(true);
  };

  
  const confirmBid = async () => {
    try {
      await placeBid({ item: id, bid_amount: value });
      setShowAuctionModal(false);
      alert(`Your bid of Rs.${value} has been placed!`);
    } catch (error) {
      console.error("Error placing bid:", error);
      alert("Failed to place bid. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="container d-flex justify-content-md-around" style={{ marginTop: '4rem' }}>
        <div className="imgcontainer">
          <img
            src={`http://localhost:8000${item.image}`}
            alt="BidImage"
            style={{ width: '650px', height: 'auto' }}
          />
        </div>
        <div className="infoContainer">
          <h1 className="headerTittle fs-1 fw-bold">{item.title}</h1>
          <h6 className="author fs-3 fst-italic">
            By {item.user.first_name} {item.user.last_name}
          </h6>

          <div className="amount">
            <h5 className="biddingamount fs-4 text-primary">Minimum Bid</h5>
            <div className="amount fs-4 text-primary">{item.minimum_bid}</div>
          </div>

          <div className="amount">
            <h5 className="biddingamount fs-4 text-primary">Current Bid</h5>
            <div className="amount fs-4 text-primary">{value}</div>
          </div>

          <h6 className="tittle bold">Time left:</h6>
          <div className="timeleft d-flex gap-3">
            <TimeBoxes end={item.end_date} />
          </div>

          <div className="endDate d-flex gap-2">
            <p className="fw-bold">Auction ends:</p>
            <p>{item.end_date}</p>
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
                value={value || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="button-container">
              <Button variant="dark" onClick={handleBidClick}>
                Bid +{bidIncrement}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <HigestBid />

      <BidModel
        show={showAuctionModal}
        onHide={() => setShowAuctionModal(false)}
        onConfirm={confirmBid}
        bidAmount={value}
      />
    </>
  );
}
