import React from 'react';

const Controls = ({ isRunning, onStart, onPause, onResume, onReset }) => {
  return (
    <div className="counter">
      {isRunning ? (
        <>
          <button
            className="onpause"
            onClick={onPause}
          >
            Pause
          </button>
          <button
            className="reset"
            disabled={!isRunning}
            onClick={onReset}
          >
            Reset
          </button>
        </>
      ) : (
        <>
          <button
            className="start"
            onClick={onStart}
          >
            Start
          </button>
          <button
            className="resume"
            disabled={isRunning}
            onClick={onResume}
          >
            Resume
          </button>
        </>
      )}
    </div>
  );
};

export default Controls;
