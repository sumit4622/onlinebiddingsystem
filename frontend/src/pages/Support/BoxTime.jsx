import React from "react";
import { useCountdown } from "./Countdown";

export default function TimeBoxes({ end }) {
  const { days, hours, minutes, seconds, retired } = useCountdown(end);

  if (retired) {
    return <p className="text-danger fw-bold">Retired</p>;
  }

  return (
    <div className="d-flex gap-3">
      {[
        { label: "Days", value: days },
        { label: "Hours", value: hours },
        { label: "Minutes", value: minutes },
        { label: "Seconds", value: seconds },
      ].map(({ label, value }, i) => (
        <div key={i} className="text-center">
          <div
            className="d-flex fs-3 justify-content-center align-items-center"
            style={{
              height: "4rem",
              width: "5rem",
              backgroundColor: "#004663",
              color: "white",
            }}
          >
            {value}
          </div>
          {label}
        </div>
      ))}
    </div>
  );
}
