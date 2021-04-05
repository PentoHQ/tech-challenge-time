import React, { useState } from "react";
import "./Session.css";
import StopWatch from "./StopWatch";
import { ISession } from "../models";
import { AxiosResponse } from "axios";
import SaveButton from "../common/SaveButton";

export interface INewSessionProps {
  onSaveNewSession: (newSession: ISession) => Promise<AxiosResponse>;
  loading: boolean;
}

const NewSession: React.FunctionComponent<INewSessionProps> = (props) => {
  const [newSessionRunning, toggleNewSessionRunning] = useState<boolean>(false);
  const [sessionName, setSessionName] = useState<string>("");
  const [validationError, setValidationError] = useState<boolean>(false);
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
    if (!canSave()) {
      setValidationError(true);
      return;
    }
    setValidationError(false);

    const newSession: ISession = {
      name: sessionName,
      length: sessionLength.join(":"),
    };
    const saveSession = await props.onSaveNewSession(newSession);

    if (saveSession?.status === 200) {
      setReset(!reset);
      setSessionName("");
    }
  };

  const canSave = () =>
    sessionName !== "" && !newSessionRunning && !props.loading;

  const onToggleHandler = () => {
    toggleNewSessionRunning(!newSessionRunning);
  };

  const onGetTimeArrayHandler = (timeArray: Array<string>) => {
    setSessionLength(timeArray);
  };

  return (
    <div>
      <h2>New Session</h2>
      <div className="session">
        <div className="session-name-container">
          <input
            autoFocus
            placeholder="Enter your session name"
            className={`session-name-input ${
              validationError ? "validation-error" : ""
            }`}
            value={sessionName}
            type="text"
            onChange={handleInput}
            readOnly={props.loading}
          />
        </div>
        <StopWatch
          onToggle={newSessionRunning}
          onReset={reset}
          onGetTimeArray={onGetTimeArrayHandler}
          loading={props.loading}
          onToggleHandler={onToggleHandler}
          onResetHandler={onReset}
        />
        <SaveButton
          canSave={canSave()}
          loading={props.loading}
          onSave={onSave}
        />
      </div>
    </div>
  );
};

export default NewSession;
