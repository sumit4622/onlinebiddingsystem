

export default function HigestBid() {
    return (
        <div>
            <div className="container mt-3" >
                <div className="Tittle">
                    <h6 className="title fw-bold">
                        Bids
                    </h6>
                </div>
                <hr />
                <div className="table-container mt-3"> {/* Optional container for margin or other general styling */}
                    <table className="table  table-striped"> {/* Apply Bootstrap table classes here */}
                        <thead>
                            <tr>
                                <th scope="col">Bidder</th>
                                <th scope="col">Bid Amount</th>
                                <th scope="col">Bid Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Sumit.*****02@gmail.com</td>
                                <td>RS.5000</td>
                                <td>7/8/2022</td>
                            </tr>
                            <tr>
                                <td>Sumit.*****02@gmail.com</td>
                                <td>RS.5000</td>
                                <td>7/8/2022</td>
                            </tr>
                            <tr>
                                <td>Sumit.*****02@gmail.com</td>
                                <td>RS.5000</td>
                                <td>7/8/2022</td>
                            </tr>
                            <tr>
                                <td>Sumit.*****02@gmail.com</td>
                                <td>RS.5000</td>
                                <td>7/8/2022</td>
                            </tr>
                            <tr>
                                <td>Sumit.*****02@gmail.com</td>
                                <td>RS.5000</td>
                                <td>7/8/2022</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
