import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function DroppedBid() {
  const [bids, setBids] = useState([
    {
      id: 'BID001',
      title: 'Vintage Leather Jacket',
      description: 'A classic vintage leather jacket from the 80s, well-preserved with minor wear...',
      imageUrl: 'https://placehold.co/100x100/e0e0e0/ffffff?text=Jacket',
      minBid: 4000,
      startDate: '2025-08-01',
      endDate: '2025-08-10',
      submittedBy: 'john_doe',
      submittedOn: '2025-07-28',
      status: 'pending',
      category: 'Apparel'
    },
    {
      id: 'BID002',
      title: 'Hand-painted Ceramic Vase',
      description: 'Exquisite hand-painted ceramic vase with intricate floral patterns...',
      imageUrl: 'https://placehold.co/100x100/d0d0d0/ffffff?text=Vase',
      minBid: 7500,
      startDate: '2025-08-05',
      endDate: '2025-08-15',
      submittedBy: 'jane_smith',
      submittedOn: '2025-07-29',
      status: 'pending',
      category: 'Home Decor'
    },
    {
      id: 'BID002',
      title: 'Hand-painted Ceramic Vase',
      description: 'Exquisite hand-painted ceramic vase with intricate floral patterns...',
      imageUrl: 'https://placehold.co/100x100/d0d0d0/ffffff?text=Vase',
      minBid: 7500,
      startDate: '2025-08-05',
      endDate: '2025-08-15',
      submittedBy: 'jane_smith',
      submittedOn: '2025-07-29',
      status: 'pending',
      category: 'Home Decor'
    },
    {
      id: 'BID002',
      title: 'Hand-painted Ceramic Vase',
      description: 'Exquisite hand-painted ceramic vase with intricate floral patterns...',
      imageUrl: 'https://placehold.co/100x100/d0d0d0/ffffff?text=Vase',
      minBid: 7500,
      startDate: '2025-08-05',
      endDate: '2025-08-15',
      submittedBy: 'jane_smith',
      submittedOn: '2025-07-29',
      status: 'pending',
      category: 'Home Decor'
    },
    {
      id: 'BID002',
      title: 'Hand-painted Ceramic Vase',
      description: 'Exquisite hand-painted ceramic vase with intricate floral patterns...',
      imageUrl: 'https://placehold.co/100x100/d0d0d0/ffffff?text=Vase',
      minBid: 7500,
      startDate: '2025-08-05',
      endDate: '2025-08-15',
      submittedBy: 'jane_smith',
      submittedOn: '2025-07-29',
      status: 'pending',
      category: 'Home Decor'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('pending');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [messageContent, setMessageContent] = useState('');

  const handleBidAction = (bidId, action) => {
    setBids(prev =>
      prev.map(b => (b.id === bidId ? { ...b, status: action } : b))
    );
    setMessageContent(`Bid ${bidId} has been ${action}.`);
  };

  const filteredBids = bids.filter(bid => {
    const matchSearch =
      bid.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bid.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bid.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus = !statusFilter || bid.status === statusFilter;
    const matchCategory = !categoryFilter || bid.category === categoryFilter;

    return matchSearch && matchStatus && matchCategory;
  });

  const categories = [...new Set(bids.map(b => b.category))];

  return (
    <div className="p-0">
      <h1 className="text-white fw-bold p-3"
        style={{
          fontFamily: "fw-bold",
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          minWidth: "fit-content",
          backgroundColor: "#004663"
        }}>
        Dropped Bid
      </h1>
      <div className="container mt-5">


        <div className="row mb-4">
          <div className="col-md">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Title, User, or Bid ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md">
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Filter by Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="col-md">
            <select
              className="form-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">Filter by Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="row">
          {filteredBids.map(bid => (
            <div className="col-md-4 mb-4" key={bid.id}>
              <div className="card h-100">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex mb-3">
                    <img
                      src={bid.imageUrl}
                      alt={bid.title}
                      className="me-3 rounded"
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                    <div>
                      <h5 className="card-title mb-1">{bid.title}</h5>
                      <p className="mb-0 small text-muted">Submitted by: {bid.submittedBy}</p>
                      <p className="mb-2 small text-muted">On: {bid.submittedOn}</p>
                    </div>
                  </div>
                  <p className="card-text mb-3">{bid.description}</p>
                  <p className="card-text mb-1"><strong>Minimum Bid:</strong> Rs {bid.minBid.toLocaleString()}</p>
                  <p className="card-text mb-3"><strong>Period:</strong> {bid.startDate} to {bid.endDate}</p>
                  <div className="mt-auto d-flex justify-content-between">
                    <button
                      className="btn btn-success"
                      onClick={() => handleBidAction(bid.id, 'approved')}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleBidAction(bid.id, 'rejected')}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredBids.length === 0 && (
            <p className="text-center text-muted">No bids match the selected filters.</p>
          )}
        </div>

        {messageContent && (
          <div className="alert alert-info alert-dismissible fade show" role="alert">
            {messageContent}
            <button type="button" className="btn-close" onClick={() => setMessageContent('')}></button>
          </div>
        )}
      </div>
    </ div>
  );
}
