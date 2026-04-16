import { useEffect, useState } from 'react';
import { BiddingHistory, uploadItem } from "../../../services/userServices";

export default function BiddingHistoryPage() {
  const [activeTab, setActiveTab] = useState("bids");
  const [bids, setBids] = useState([]);
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    if (activeTab === "bids") {
      BiddingHistory().then(res => {
        setBids(res.data.bids);
      });
    } else {
      uploadItem().then(res => {
        setUploads(res.data.uploads);
      });
    }
  }, [activeTab]);

  return (
    <div>
      {/* TAB HEADER */}
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

      {/* BIDDING HISTORY TABLE */}
      {activeTab === "bids" ? (
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Product</th>
              <th>Your bid</th>
              <th>Current bid</th>
            </tr>
          </thead>
          <tbody>
            {bids.map((item, index) => (
              <tr key={index}>
                <td>
                  <div className="d-flex align-items-center gap-3">
                    <img src={`http://20.40.56.69:8000${item.image}`} width="60" height="60" style={{ objectFit: 'cover' }} />
                    <span>{item.itemName}</span>
                  </div>
                </td>
                <td>Rs {item.yourBid}</td>
                <td>Rs {item.currentBid}</td>
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
            {uploads.map((item, index) => (
              <tr key={index}>
                <td>
                  <div className="d-flex align-items-center gap-3">
                    <img src={`http://20.40.56.69:8000${item.image}`} width="60" height="60" style={{ objectFit: 'cover' }} />
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
