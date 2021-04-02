import React, { useEffect, useState } from "react";
import SessionService from "../services/sessions.service";

import "./Session.css";
import StopWatch from "./StopWatch";
import Controls from "./Controls";

const sessionService = new SessionService();

const Session: React.FunctionComponent = () => {
  const [newSession, toggleNewSession] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);
  // const [res, setRes] = useState<any>();

  useEffect(() => {
    const fetchSessions = sessionService.getSessions();
    fetchSessions.then((data) => {
      console.log(data);
    });
    //     .then((data) => {
    //   console.log(data);
    // });
  }, []);

  const onReset = () => {
    setReset(!reset);
    toggleNewSession(false);
  };

  const onSave = () => {};

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
