import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Header from './landing component/Header';
import LogoutModal from "./login/LogoutModal";

export default function Dashboard() {
  const [sortBy, setSortBy] = useState('');

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <>
      <LogoutModal />
      <Header />
      <div className="p-3" style={{backgroundColor:'#004663'}}>
        <div className="midContain d-flex m-5 justify-content-between align-items-center">
          <h1 className="mb-0 text-white fs-1 fw-bold">Auctions</h1>

          <Form.Group controlId="sortBySelect" className="w-auto mb-0">
            <Form.Select value={sortBy} onChange={handleSortChange}>
              <option value=""disabled hidden>Select an option</option>
              <option value="latest">Latest</option>
              <option value="week">Previous Week</option>
              <option value="month">Previous Month</option>
              <option value="retired">Retired</option>
            </Form.Select>
          </Form.Group>
        </div>
      </div>
      <div className="card m-5" style={{width: "18rem"}}>
          <div className="card-body">
            <h5 className="card-tittle">Card tittle</h5>
            <h6 className="card-subtittle mb-2 text-muted">card-tittle</h6>
            <p>This is a smart watch which is great for young people.</p>
            <hr />
            <p>Rs: 4000</p>
            <button className='btn btn-dark'> start Bid</button>
          </div>
         </div>
    </>
  );
}
