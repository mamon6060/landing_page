"use client";

import { useEffect, useState } from "react";

const TimerSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 22,
    minutes: 12,
    seconds: 7,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else {
          if (minutes > 0) {
            minutes--;
            seconds = 59;
          } else if (hours > 0) {
            hours--;
            minutes = 59;
            seconds = 59;
          } else if (days > 0) {
            days--;
            hours = 23;
            minutes = 59;
            seconds = 59;
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-bold text-center text-bgPrimary">
      সময় শেষ না হতেই অর্ডার করুন এখনই !
      </h2>
      <div className="flex gap-4 text-center text-white">
        <div className="bg-bgPrimary p-4 rounded-lg">
          <span className="text-2xl font-bold">{timeLeft.days}</span>
          <div className="text-sm">Days</div>
        </div>
        <div className="bg-bgPrimary p-4 rounded-lg">
          <span className="text-2xl font-bold">{timeLeft.hours}</span>
          <div className="text-sm">Hours</div>
        </div>
        <div className="bg-bgPrimary p-4 rounded-lg">
          <span className="text-2xl font-bold">{timeLeft.minutes}</span>
          <div className="text-sm">Minutes</div>
        </div>
        <div className="bg-bgPrimary p-4 rounded-lg">
          <span className="text-2xl font-bold">{timeLeft.seconds}</span>
          <div className="text-sm">Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default TimerSection;
