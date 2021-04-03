import React, { useState } from "react";
import "./Controls.css";
import save from "../assets/save.png";

interface IControlProps {
  onToggleNewSession: (running: boolean) => void;
  onReset: () => void;
  onSave: () => void;
  canSave: boolean;
}
const Controls: React.FunctionComponent<IControlProps> = (props) => {
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
    <div className="controls">
      <button
        className={`${isTimerRunning ? "stop" : "start"}`}
        onClick={onToggle}
      >
        {isTimerRunning ? "STOP" : "START"}
      </button>
      <button className="reset" onClick={onResetHandler}>
        RESET
      </button>
      <button
        disabled={!props.canSave}
        onClick={props.onSave}
        className={`${!props.canSave ? "disabled" : ""}`}
      >
        <img src={save} alt="save" />
      </button>
    </div>
  );
};

export default Controls;
