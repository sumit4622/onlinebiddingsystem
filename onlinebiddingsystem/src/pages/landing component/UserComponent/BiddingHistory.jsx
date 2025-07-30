import { useState } from 'react';
import SAN from "../../../assets/SAN.png";

const mockBids = [
  {
    image: SAN,
    name: "Plant and Pots",
    yourBid: "RS 1000",
    currentBid: "RS 800",
    status: "Started"
  },
  {
    image: SAN,
    name: "Bird in Forest",
    yourBid: "RS 200",
    currentBid: "RS 100",
    status: "Started"
  },
  {
    image: SAN,
    name: "Woman in Forest",
    yourBid: "RS 700",
    currentBid: "RS 700",
    status: "Started"
  }
];

const mockUploads = [
  {
    image: SAN,
    name: "Uploaded Plant",
    date: "2025-07-20"
  },
  {
    image: SAN,
    name: "Old Clock",
    date: "2025-07-18"
  },
  {
    image: SAN,
    name: "Old Clock",
    date: "2025-07-18"
  }
];

export default function BiddingHistoryPage() {
  const [activeTab, setActiveTab] = useState("bids");

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="fw-bold text-dark mb-0">
          <span
            className={`me-2 ${activeTab === 'bids' ? 'text-primary text-decoration-underline' : 'text-secondary'}`}
            style={{ cursor: 'pointer' }}
            onClick={() => setActiveTab("bids")}
          >
            Bidding History
          </span>
          <span className="text-dark"> / </span>
          <span
            className={`ms-2 ${activeTab === 'uploads' ? 'text-primary text-decoration-underline' : 'text-secondary'}`}
            style={{ cursor: 'pointer' }}
            onClick={() => setActiveTab("uploads")}
          >
            Upload Item
          </span>
        </h5>
      </div>


      <hr />

      {activeTab === "bids" ? (
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Product</th>
              <th>Your bid</th>
              <th>Current bid</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {mockBids.map((item, index) => (
              <tr key={index}>
                <td>
                  <div className="d-flex align-items-center gap-3">
                    <img src={item.image} alt={item.name} width="60" height="60" style={{ objectFit: 'cover' }} />
                    <span>{item.name}</span>
                  </div>
                </td>
                <td>{item.yourBid}</td>
                <td>{item.currentBid}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Uploaded Item</th>
              <th>Upload Date</th>
            </tr>
          </thead>
          <tbody>
            {mockUploads.map((item, index) => (
              <tr key={index}>
                <td>
                  <div className="d-flex align-items-center gap-3">
                    <img src={item.image} alt={item.name} width="60" height="60" style={{ objectFit: 'cover' }} />
                    <span>{item.name}</span>
                  </div>
                </td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
