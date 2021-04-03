import React, { useEffect, useState } from "react";
import { IStoredSession } from "../models";

interface IStoredSessionsProps {
  storedSessions: Array<IStoredSession>;
}

const StoredSessions: React.FunctionComponent<IStoredSessionsProps> = (
  props
) => {
  return (
    <div>
      {props.storedSessions.map((session) => (
        <div key={session.name}>
          <div>{session.name}</div>
          <div>{session.length}</div>
        </div>
      ))}
    </div>
  );
};

export default StoredSessions;
