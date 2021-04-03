import React, { useState } from "react";
import SessionService from "../services/sessions.service";
import "./Session.css";
import StopWatch from "./StopWatch";
import Controls from "./Controls";
import { ISession } from "../models";

const sessionService = new SessionService();

const Session: React.FunctionComponent = () => {
  const [newSessionRunning, toggleNewSessionRunning] = useState<boolean>(false);
  const [sessionName, setSessionName] = useState<string>("");
  const [sessionLength, setSessionLength] = useState<Array<string>>([]);
  const [reset, setReset] = useState<boolean>(false);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSessionName(event.target.value);
  };

  const onReset = () => {
    setReset(!reset);
    toggleNewSessionRunning(false);
  };

  const onSave = () => {
    const newSession: ISession = {
      name: sessionName,
      length: sessionLength.join(':'),
    };
    sessionService.saveSessions(newSession);
  };

  const canSave = () => sessionName !== "" && !newSessionRunning;

  const onToggleHandler = () => {
    toggleNewSessionRunning(!newSessionRunning);
  };

  const onGetTimeArrayHandler = (timeArray: Array<string>) => {
    setSessionLength(timeArray);
  };

  return (
    <div className="session">
      <input
        placeholder="Enter your session name"
        className="session-name-input"
        value={sessionName}
        type="text"
        onChange={handleInput}
      />
      <StopWatch
        onToggle={newSessionRunning}
        onReset={reset}
        onGetTimeArray={onGetTimeArrayHandler}
      />
      <Controls
        onToggleNewSession={onToggleHandler}
        onReset={onReset}
        onSave={onSave}
        canSave={canSave()}
      />
    </div>
  );
};

export default Session;
