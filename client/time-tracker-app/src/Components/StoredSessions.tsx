import React from "react";
import { IStoredSession } from "../models";
import "./StoredSession.css";
import DeleteButton from "../common/DeleteButton";
import { formatTimeStamp } from "../Helper/formatDateStamp";
import { OverviewFilter } from "./Main/Main";

interface IStoredSessionsProps {
  storedSessions: Array<IStoredSession>;
  onDeleteSession: (sessionId: number) => void;
  loading: boolean;
  onFetchFilteredSessions: (overview: OverviewFilter) => void;
}

const StoredSessions: React.FunctionComponent<IStoredSessionsProps> = (
  props
) => {
  return (
    <div>
      <h2>Saved Sessions</h2>
      <div>
        <button
          className="overview"
          onClick={() => props.onFetchFilteredSessions(OverviewFilter.all)}
        >
          Show All
        </button>
        <button
          className="overview"
          onClick={() => props.onFetchFilteredSessions(OverviewFilter.weekly)}
        >
          Last 7 days
        </button>
        <button
          className="overview"
          onClick={() => props.onFetchFilteredSessions(OverviewFilter.monthly)}
        >
          Last 31 days
        </button>
      </div>
      <div className="titles">
        <div>Name</div>
        <div>Length</div>
        <div>Created</div>
        <div></div>
      </div>
      {props.storedSessions.map((session) => (
        <div className="stored-session" key={session.name}>
          <div>{session.name}</div>
          <div>{session.length}</div>
          <div>{formatTimeStamp(session.created_at)}</div>
          <DeleteButton
            onDelete={() => props.onDeleteSession(session.id)}
            loading={props.loading}
          />
        </div>
      ))}
    </div>
  );
};

export default StoredSessions;
