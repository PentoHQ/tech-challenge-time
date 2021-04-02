import React, { useState } from "react";
import "./Session.css";
import StopWatch from "./StopWatch";
import Controls from "./Controls";

const Session: React.FunctionComponent = () => {
  const [newSession, toggleNewSession] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);

  const onReset = () => {
    setReset(!reset);
    toggleNewSession(false);
  };

  const onSave = () => {}

  return (
    <div className="session">
      <input type="text" />
      <StopWatch onToggle={newSession} onReset={reset} />
      <Controls
        onToggleNewSession={() => toggleNewSession(!newSession)}
        onReset={onReset}
        onSave={onSave}
        canSave={false}
      />
    </div>
  );
};

export default Session;
