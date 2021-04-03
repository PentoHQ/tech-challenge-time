import React, { useEffect, useState } from "react";
import Session from "../Session";
import "./Main.css";
import { ISession } from "../../models";
import SessionService from "../../services/sessions.service";
import StoredSessions from "../StoredSessions";

const sessionService = new SessionService();

const Main: React.FunctionComponent = () => {
  const [storedSessions, setStoredSessions] = useState<Array<ISession>>([]);

  useEffect(() => {
    const fetchSessions = sessionService.getSessions();
    fetchSessions.then((data) => {
      setStoredSessions(data);
    });
  }, []);

  return (
    <div className="wrapper">
      <div>Time Tracker App</div>
      <Session />
      <StoredSessions storedSessions={storedSessions} />
    </div>
  );
};

export default Main;
