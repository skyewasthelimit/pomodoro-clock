// PomodoroClock.js
import React, { useState, useEffect } from 'react';
import Timer from './Timer';

const PomodoroClock = () => {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timerMinutes, setTimerMinutes] = useState(sessionLength);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        if (timerMinutes === 0 && timerSeconds === 0) {
          clearInterval(timer);
          // Toggle between session and break
          if (sessionLength) {
            setTimerMinutes(breakLength);
            setSessionLength(0);
          } else {
            setTimerMinutes(sessionLength);
            setBreakLength(0);
          }
          setIsRunning(false);
        } else {
          if (timerSeconds === 0) {
            setTimerMinutes((prev) => prev - 1);
            setTimerSeconds(59);
          } else {
            setTimerSeconds((prev) => prev - 1);
          }
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isRunning, timerMinutes, timerSeconds, sessionLength, breakLength]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSessionLength(25);
    setBreakLength(5);
    setTimerMinutes(25);
    setTimerSeconds(0);
  };

  return (
    <div>
      <h1>Pomodoro Clock</h1>
      <Timer
        minutes={timerMinutes}
        seconds={timerSeconds}
        start={handleStart}
        pause={handlePause}
        reset={handleReset}
      />
      <div>
        <label>Session Length</label>
        <input
          type="number"
          value={sessionLength}
          onChange={(e) => setSessionLength(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label>Break Length</label>
        <input
          type="number"
          value={breakLength}
          onChange={(e) => setBreakLength(parseInt(e.target.value))}
        />
      </div>
    </div>
  );
};

export default PomodoroClock;
