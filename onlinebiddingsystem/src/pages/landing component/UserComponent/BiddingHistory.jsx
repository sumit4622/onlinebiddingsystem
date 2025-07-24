import SAN from "../../../assets/SAN.png"

export default function BiddingHistory() {
  const bids = [
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

  return (
    <div>
      <h5 className="fw-bold text-primary">Bidding History <span className="text-dark">Upload item</span></h5>
      <hr />
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
          {bids.map((item, index) => (
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
    </div>
  );
}
