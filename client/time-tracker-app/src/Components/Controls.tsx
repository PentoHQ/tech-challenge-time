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
  const [running, setRunning] = useState<boolean>(false);

  const onToggle = () => {
    setRunning(!running);
    props.onToggleNewSession(!running);
  };

  return (
    <div className="controls">
      <button className={`${running ? "stop" : "start"}`} onClick={onToggle}>
        {running ? "STOP" : "START"}
      </button>
      <button className="reset" onClick={props.onReset}>
        RESET
      </button>
      <button>
        <img src={save} alt="save" />
      </button>
    </div>
  );
};

export default Controls;
