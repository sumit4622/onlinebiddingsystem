import { useEffect, useState } from 'react';
import { getBiditemItem } from '../../../services/userServices';

export default function HigestBid({ itemId }) {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    if (!itemId) return;

    async function fetchBids() {
      try {
        const data = await getBiditemItem(itemId);
        setBids(data || []);
      } catch (error) {
        console.error("Error fetching bids:", error);
      }
    }

    fetchBids();

    // Optional: poll every 5 seconds to update bid amounts dynamically
    const interval = setInterval(fetchBids, 5000);
    return () => clearInterval(interval);
  }, [itemId]);

  return (
    <div>
      <div className="container mt-3" >
        <div className="Tittle">
          <h6 className="title fw-bold">Bids</h6>
        </div>
        <hr />
        <div className="table-container mt-3">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Bidder</th>
                <th scope="col">Bid Amount</th>
                <th scope="col">Bid Time</th>
              </tr>
            </thead>
            <tbody>
              {bids.length > 0 ? (
                bids.map((bid) => (
                  <tr key={bid.id}>
                    <td>{bid.user?.username || "Unknown"}</td>
                    <td>RS. {bid.bid_amount}</td>
                    <td>
                      {bid.create_at
                        ? new Date(bid.create_at).toLocaleString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : ""}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    No bids yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
