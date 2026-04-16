import { useCountdown } from "./Countdown";
import { useEffect } from "react";

export default function TimeCompact({ end, onRetiredChange }) {
  const { days, hours, minutes, retired } = useCountdown(end);

  useEffect(() => {
    if (onRetiredChange) {
      onRetiredChange(retired);
    }
  }, [retired]); 

  return (
    <div
      className="Duration rounded-pill pt-2 pb-2 px-lg-3 px-sm-2 text-white flex-shrink-0"
      style={{
        backgroundColor: retired ? "#B22222" : "#3C3C43",
      }}
    >
      <p className="mb-0 text-nowrap">
        {retired ? "Retired" : `${days}d ${hours}hr ${minutes}min`}
      </p>
    </div>
  );
}
