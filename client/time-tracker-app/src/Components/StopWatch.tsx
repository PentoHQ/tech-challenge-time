import React, { useEffect, useState } from "react";
import "./StopWatch.css";
import calculateTimer from "../Helper/CalculateTimer";

interface IStopWatchProps {
  onToggle: boolean;
  onReset: boolean;
}

const StopWatch: React.FunctionComponent<IStopWatchProps> = (props) => {
  const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
  const [timeArray, setTimeArray] = useState<Array<string>>([]);
  const [intervalId, setIntervalId] = useState<number>(0);

  useEffect(() => {
    if (props.onToggle) {
      const id = setInterval(() => {
        setTimeInSeconds((state) => state + 1);
      }, 1000);
      setIntervalId(+id);
    } else {
      clearInterval(intervalId);
    }
  }, [props.onToggle]);

  useEffect(() => {
    clearInterval(intervalId);
    setTimeInSeconds(0);
  }, [props.onReset]);

  useEffect(() => {
    setTimeArray(calculateTimer(timeInSeconds));
  }, [timeInSeconds]);

  return (
    <div className="container">
      <p>{timeArray[0]}</p>
      <p className="separator">:</p>
      <p>{timeArray[1]}</p>
      <p className="separator">:</p>
      <p>{timeArray[2]}</p>
    </div>
  );
};

export default StopWatch;
