
import { useState, useEffect } from 'react';

type CountdownTimerProps = {
  hours: number;
};

const CountdownTimer = ({ hours }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: hours,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(timer);
          return prev;
        }

        let newHours = prev.hours;
        let newMinutes = prev.minutes;
        let newSeconds = prev.seconds - 1;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }

        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }

        return {
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (value: number) => value.toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-2 font-mono">
      <div className="bg-white text-[#FF6600] px-3 py-1 rounded font-bold">
        {formatTime(timeLeft.hours)}
      </div>
      <span className="text-white">:</span>
      <div className="bg-white text-[#FF6600] px-3 py-1 rounded font-bold">
        {formatTime(timeLeft.minutes)}
      </div>
      <span className="text-white">:</span>
      <div className="bg-white text-[#FF6600] px-3 py-1 rounded font-bold">
        {formatTime(timeLeft.seconds)}
      </div>
    </div>
  );
};

export default CountdownTimer;
