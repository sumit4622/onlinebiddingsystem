import { useState, useEffect } from "react";

export function useCountdown(end) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, retired: false });

  const calculateTime = () => {
    const now = new Date();
    const endTime = new Date(end);
    let diff = endTime - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, retired: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);

    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);

    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);

    const seconds = Math.floor(diff / 1000);

    return { days, hours, minutes, seconds, retired: false };
  };

  useEffect(() => {
    setTimeLeft(calculateTime());

    const timer = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000); // update every second

    return () => clearInterval(timer);
  }, [end]);

  return timeLeft;
}
