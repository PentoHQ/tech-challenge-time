import React, { useEffect, useState } from "react";
import { IStoredSession } from "../models";
import './StoredSession.css';

interface IStoredSessionsProps {
  storedSessions: Array<IStoredSession>;
  onDeleteSession: (sessionId: number) => void;
}

const StoredSessions: React.FunctionComponent<IStoredSessionsProps> = (
  props
) => {
  return (
    <div>
      <h2>Saved Sessions</h2>
      {props.storedSessions.map((session) => (
        <div className="stored-session" key={session.name}>
          <div>{session.name}</div>
          <div>{session.length}</div>
          <button onClick={() => props.onDeleteSession(session.id)}>X</button>
        </div>
      ))}
    </div>
  );
};

export default StoredSessions;
