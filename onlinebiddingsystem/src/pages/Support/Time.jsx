import React, { useState, useEffect } from "react";

export default function Time({ end }) {
  const [timeLeft, setTimeLeft] = useState("");

  const formatDuration = (endDate) => {
    const now = new Date();
    const endTime = new Date(endDate);
    let diff = endTime - now;

    if (diff <= 0) return "Retired";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);

    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);

    const minutes = Math.floor(diff / (1000 * 60));

    return `${days}d ${hours}hr ${minutes}min`;
  };

  useEffect(() => {
    setTimeLeft(formatDuration(end));

    const timer = setInterval(() => {
      setTimeLeft(formatDuration(end));
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [end]);

  return (
    <div
      className="Duration rounded-pill pt-2 pb-2 px-lg-3 px-sm-2 text-white flex-shrink-0"
      style={{
        backgroundColor: timeLeft === "Retired" ? "#B22222" : "#3C3C43",
      }}
    >
      <p className="mb-0 text-nowrap">{timeLeft}</p>
    </div>
  );
}
