import React, { useState } from "react";
import SessionService from "../services/sessions.service";
import "./Session.css";
import StopWatch from "./StopWatch";
import Controls from "./Controls";
import { ISession } from "../models";
import { AxiosResponse } from "axios";

export interface ISessionProps {
  onSaveNewSession: (newSession: ISession) => Promise<AxiosResponse>;
}

const Session: React.FunctionComponent<ISessionProps> = (props) => {
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
    setSessionName("");
    toggleNewSessionRunning(false);
  };

  const onSave = async () => {
    const newSession: ISession = {
      name: sessionName,
      length: sessionLength.join(":"),
    };
    const saveSession = await props.onSaveNewSession(newSession);

    if (saveSession.status === 200) {
      setReset(!reset);
      setSessionName("");
    }
  };

  const canSave = () => sessionName !== "" && !newSessionRunning;

  const onToggleHandler = () => {
    toggleNewSessionRunning(!newSessionRunning);
  };

  const onGetTimeArrayHandler = (timeArray: Array<string>) => {
    setSessionLength(timeArray);
  };

  return (
    <div>
      <h2>New Sessions</h2>
      <div className="session">
        <div className="session-name-container">
          <input
            autoFocus
            placeholder="Enter your session name"
            className="session-name-input"
            value={sessionName}
            type="text"
            onChange={handleInput}
          />
        </div>
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
    </div>
  );
};

export default Session;
