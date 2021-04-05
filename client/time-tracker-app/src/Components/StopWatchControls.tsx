import React, { useState } from "react";
import play from "../assets/play.png";
import stop from "../assets/stop.png";
import reset from "../assets/reset.png";

interface IStopWatchControlsProps {
  onToggleNewSession: (running: boolean) => void;
  onReset: () => void;
  loading: boolean;
}
const StopWatchControls: React.FunctionComponent<IStopWatchControlsProps> = (
  props
) => {
  const [isTimerRunning, setIsTimeRunning] = useState<boolean>(false);

  const onToggle = () => {
    setIsTimeRunning(!isTimerRunning);
    props.onToggleNewSession(!isTimerRunning);
  };

  const onResetHandler = () => {
    setIsTimeRunning(false);
    props.onReset();
  };

  return (
    <div>
      <button onClick={onToggle} disabled={props.loading}>
        {isTimerRunning ? (
          <img src={stop} alt="stop" />
        ) : (
          <img src={play} alt="start" />
        )}
      </button>
      <button
        className="reset"
        onClick={onResetHandler}
        disabled={props.loading}
      >
        <img src={reset} alt="reset" />
      </button>
    </div>
  );
};

export default StopWatchControls;
