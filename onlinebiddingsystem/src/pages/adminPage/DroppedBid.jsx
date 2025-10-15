import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { fetchItems, approveBid, rejectBid, deleteBid } from '../../services/adminServices';

export default function DroppedBid() {
  const [bids, setBids] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('pending');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadBids = async () => {
      try {
        const data = await fetchItems();
        const formatted = data.map((item, index) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          imageUrl: `http://127.0.0.1:8000${item.image}`,
          minBid: parseFloat(item.minimum_bid),
          startDate: item.start_date,
          endDate: item.end_date,
          submittedBy: `${item.user.first_name} ${item.user.last_name}` || 'Unknown User',
          submittedOn: item.created_at ? item.created_at.split('T')[0] : 'Unknown',
          status: item.is_approved === null ? 'pending' : item.is_approved === true ? 'approved' : 'rejected',
          category: item.category || 'General',
        }));
        setBids(formatted);
      } catch (err) {
        setError('Failed to fetch bids.');
      }
    };

    loadBids();
  }, []);

  const handleBidAction = async (bidId, action) => {
    try {
      if (action === 'approved') {
        await approveBid(bidId);
        console.log(`${bidId} is ${action} made`)
      } else if (action === "rejected") {
        console.log(`${bidId} is ${action} made`)
        await rejectBid(bidId);
      }
      setBids(prevBids =>
        prevBids.map(bid =>
          bid.id === bidId
            ? { ...bid, status: action === 'approved' ? 'approved' : 'rejected' }
            : bid
        )
      );
      setMessageContent(`Bid ${bidId} has been ${action}.`);
    } catch (err) {
      setError(`Failed to ${action} bid ${bidId}`);
    }
  };

  const filteredBids = bids.filter(bid => {
    const matchSearch =
      bid.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bid.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bid.id.toString().includes(searchTerm);
    const matchStatus = !statusFilter || bid.status === statusFilter;
    const matchCategory = !categoryFilter || bid.category === categoryFilter;
    return matchSearch && matchStatus && matchCategory;
  });

  const categories = [...new Set(bids.map(b => b.category))];

  const handleDelete = async (bidId) => {
    try {
      await deleteBid(bidId);
      setBids(prev => prev.filter(bid => bid.id !== bidId));
      setMessageContent(`Bid ${bidId} has been deleted.`);
    } catch (err) {
      setError(`Failed to delete bid ${bidId}`);
    }
  };

  return (
    <div className="p-0">
      <h1 className="text-white fw-bold p-4" style={{ backgroundColor: "#004663" }}>
        Dropped Bid
      </h1>

      <div className="container mt-5">
        {error && <div className="alert alert-danger">{error}</div>}

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
            <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="col-md">
            <select className="form-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="">Filter by Category</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>

        <div className="row">
          {filteredBids.map(bid => (
            <div className="col-md-4 mb-4" key={bid.id}>
              <div className="card h-100">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex mb-3 align-items-center">
                    <img src={bid.imageUrl} alt={bid.title} className="me-3 rounded" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                    <div>
                      <h5 className="card-title mb-1">{bid.title}</h5>
                      <p className="mb-0 small text-muted">Submitted by: {bid.submittedBy}</p>
                      <p className="mb-2 small text-muted">On: {bid.submittedOn}</p>
                    </div>
                    <div className='ms-auto'>
                      <button className='btn btn-md btn-link text-danger p-0'
                        onClick={() => handleDelete(bid.id)}>
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                  <p className="card-text mb-3">{bid.description}</p>
                  <p className="card-text mb-1"><strong>Minimum Bid:</strong> Rs {bid.minBid.toLocaleString()}</p>
                  <p className="card-text mb-3"><strong>Period:</strong> {bid.startDate} to {bid.endDate}</p>
                  <div className="mt-auto d-flex justify-content-between">
                    <button className="btn btn-success" onClick={() => handleBidAction(bid.id, 'approved')}>Approve</button>
                    <button className="btn btn-danger" onClick={() => handleBidAction(bid.id, 'rejected')}>Reject</button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredBids.length === 0 && <p className="text-center text-muted">No bids match the selected filters.</p>}
        </div>

        {messageContent && (
          <div className="alert alert-info alert-dismissible fade show" role="alert">
            {messageContent}
            <button type="button" className="btn-close" onClick={() => setMessageContent('')}></button>
          </div>
        )}
      </div>
    </div>
  );
}
