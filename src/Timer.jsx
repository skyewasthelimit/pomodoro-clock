// Timer.js
import React from 'react';

const Timer = ({ minutes, seconds, start, pause, reset }) => {
  return (
    <div>
      <div>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Timer;
