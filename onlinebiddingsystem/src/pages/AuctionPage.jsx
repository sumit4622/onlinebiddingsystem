import Header from "./landing component/Header";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import HigestBid from "./landing component/PagesComponents/HigestBid";
import PopMessage from "../landingPage/Components/Popup";
import TimeBoxes from "./Support/BoxTime";
import { placeBid, fetch_latestbid, connectAuctionSocket, userCerndincial } from "../services/userServices";
import BidModel from "../landingPage/Components/BidModel";
import Feedback from "../landingPage/Components/Feedback";

export default function AuctionPage() {
  const [value, setValue] = useState(null);
  const [userData, setUserData] = useState('');
  const [showAuctionModal, setShowAuctionModal] = useState(false);
  const [socket, setSocket] = useState(null);
  const [auctionEnded, setAuctionEnded] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  const { id } = useParams();
  const location = useLocation();
  const item = location.state?.item;



  const bidIncrement = 100;

  useEffect(() => {
    const userDeatils = async () => {
      try {
        const data = await userCerndincial();
        setUserData(data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          alert('Error:', error.message);
        }
        console.error("Error fetching data:", error);
      }
    };
    userDeatils();
  }, [])

  useEffect(() => {
    if (userData && item) {
      setIsOwner(userData.id === item.user.id);
    }
  }, [userData, item]);

  useEffect(() => {
    const fetchLatestBid = async () => {
      try {
        const data = await fetch_latestbid({ itemId: id });
        setValue(data.latest_bid_amount);
      } catch (error) {
        console.log(`${error}: failed to fetach Bid.`);
        setValue(0);
      }
    };
    fetchLatestBid();
  }, [id, item]);

  useEffect(() => {
    const socket = connectAuctionSocket(id);

    socket.onopen = () => {
      console.log("WebSocket connected to auction:", id);
      setSocket(socket);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Received:", data);
        if (data.type === "new_bid") {
          setValue(data.bid_amount);
        } else if (data.type === "error") {
          alert(data.message)
        }
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };

    socket.onclose = (event) => {
      console.warn("WebSocket closed:", event);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

  }, [id])

  useEffect(() => {
    const checkAuctionEnd = () => {
      const now = new Date();
      const endDate = new Date(item.end_date);

      if (now >= endDate && !auctionEnded) {
        setAuctionEnded(true);


        // fetch_latestbid({ itemId: id })
        //   .then(data => {
        //     if (data.latest_bid_amount > 0) {
        //       console.log(data)
        //       setWinner(data.winner.first_name);
        //     } else {
        //       setWinner("No one");
        //     }
        //   })
          // .catch(err => console.error("Failed to fetch winner:", err));
      }
    };

    checkAuctionEnd();
    const interval = setInterval(checkAuctionEnd, 10000);

    return () => clearInterval(interval);
  }, [id, auctionEnded]);





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
    if (socket && socket.readyState === WebSocket.OPEN) {
      const bidData = {
        type: "place_bid",
        itemId: id,
        bid_amount: value,
        user: `${userData.first_name}`,
      };
      socket.send(JSON.stringify(bidData));
      console.log("Sending bid:", bidData);

      setShowAuctionModal(false);
      // alert(`your bid amount is ${value} is placed`);
    } else {
      alert(`bid is not placed.`);
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
                disabled={auctionEnded}
              />
            </div>
            <div className="button-container">
              <Button
                variant="dark"
                onClick={handleBidClick}
                disabled={auctionEnded || isOwner}
              >
                {auctionEnded ? "Auction Ended" : `Bid +${bidIncrement}`}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <HigestBid itemId={id} />
      <PopMessage isAuctionEnded={auctionEnded} />
      <Feedback itemId={id} />

      <BidModel
        show={showAuctionModal}
        onHide={() => setShowAuctionModal(false)}
        onConfirm={confirmBid}
        bidAmount={value}
      />
    </>
  );
}
