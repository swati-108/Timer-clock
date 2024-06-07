import React, { useState, useEffect } from 'react';
import Controls from './Controls';

const Timer = () => {
  const [minutes, setMinutes] = useState(25); // Initial state - 25 minutes
  const [seconds, setSeconds] = useState(0); // Initial state - 0 seconds
  const [isRunning, setIsRunning] = useState(false); // Timer state - not running

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isRunning) {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(intervalId); // Stop timer at 00:00
            // Optionally play an alarm sound here
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [isRunning, minutes, seconds]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleResume = () => setIsRunning(true);
  const handleReset = () => {
    setMinutes(25);
    setSeconds(0);
    setIsRunning(false);
  };
  const handleDurationChange = (event) => {
    setMinutes(parseInt(event.target.value)); // Update initial minutes
  };

  // Corrected formattedTime without unnecessary escape characters
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
// Calculate circumference for a 40px radius circle
 

  const progress = (minutes, seconds) => {
    const totalSeconds = minutes * 60 + seconds;
    const elapsedSeconds = totalSeconds - (minutes * 60 + seconds);
    const progressPercentage = (elapsedSeconds / totalSeconds) * 100;
    return progressPercentage;
  };

  

  return (
    <div className="container">
      <div className="flex">
        <select className="dropdown" onChange={handleDurationChange}>
          <option value="25">25 Minutes</option>
          <option value="30">30 Minutes</option>
          <option value="45">45 Minutes</option>
          <option value="60">60 Minutes</option>
        </select>
        
        <div className="text-center ml-4">
          <h1 className="heading">{formattedTime}</h1>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
        <div className={`w-${progress(minutes, seconds)}% bg-red-500 rounded-full h-2`}></div>
      </div>
      <Controls
        isRunning={isRunning}
        onStart={handleStart}
        onPause={handlePause}
        onResume={handleResume}
        onReset={handleReset}
      />
      </div>
  );
};

export default Timer;
