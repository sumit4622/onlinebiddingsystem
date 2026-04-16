import React, { useEffect, useState } from "react";
import { fetchFeedback } from "../../services/adminServices";

export default function CustomerReview() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeedback = async () => {
      try {
        const data = await fetchFeedback();
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setLoading(false);
      }
    };
    getFeedback();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status" style={{ color: "#01446b" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading feedback...</p>
      </div>
    );
  }

  const groupedFeedback = feedbacks.reduce((acc, fb) => {
    if (!acc[fb.item_title]) acc[fb.item_title] = [];
    acc[fb.item_title].push(fb);
    return acc;
  }, {});

  return (
    <div className="p-0">
      <h1 className="text-white fw-bold p-4" style={{ backgroundColor: "#004663" }}>
        Customer Review
      </h1>

      {feedbacks.length === 0 ? (
        <p className="p-4">No feedback available.</p>
      ) : (
        <div className="container p-3">
          {Object.keys(groupedFeedback).map((itemTitle, idx) => (
            <div className="mb-3" key={idx}>
              <button
                className="btn btn-primary w-100 text-start"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapseItem${idx}`}
                aria-expanded="false"
                aria-controls={`collapseItem${idx}`}
              >
                {itemTitle} ({groupedFeedback[itemTitle].length} feedbacks)
              </button>

              <div className="collapse mt-2" id={`collapseItem${idx}`}>
                <div className="table-responsive">
                  <table className="table table-striped table-bordered">
                    <thead style={{ backgroundColor: "#01446b", color: "#fff" }}>
                      <tr>
                        <th>User</th>
                        <th>Name</th>
                        <th>Likes</th>
                        <th>Dislikes</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedFeedback[itemTitle].map((fb) => (
                        <tr key={fb.id}>
                          <td>{fb.user_name}</td>
                          <td>{fb.name}</td>
                          <td>{fb.likes || "-"}</td>
                          <td>{fb.dislikes || "-"}</td>
                          <td>{new Date(fb.created_at).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
