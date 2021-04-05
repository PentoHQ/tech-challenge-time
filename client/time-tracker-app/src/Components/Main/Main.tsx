import React, { useEffect, useState } from "react";
import Session from "../Session";
import "./Main.css";
import { ISession, IStoredSession } from "../../models";
import SessionService from "../../services/sessions.service";
import StoredSessions from "../StoredSessions";
import {AxiosResponse} from "axios";

const sessionService = new SessionService();

const Main: React.FunctionComponent = () => {
  const [storedSessions, setStoredSessions] = useState<Array<IStoredSession>>(
    []
  );

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = () => {
    sessionService.getSessions().then((data) => {
      setStoredSessions(data);
    });
  };

  const saveNewSession = async (newSession: ISession): Promise<AxiosResponse> => {
    const saveSession = await sessionService.saveSessions(newSession);
    if (saveSession?.status === 200) {
      fetchSessions();
    }
    return saveSession;
  };

  const deleteSession = async (sessionId: number) => {
    const deleteSession = await sessionService.deleteSession(sessionId);
    if (deleteSession?.status === 200) {
      fetchSessions();
    }
  };

  return (
    <div className="wrapper">
      <h1>Time Tracker App</h1>
      <Session onSaveNewSession={saveNewSession} />
      <StoredSessions
        storedSessions={storedSessions}
        onDeleteSession={deleteSession}
      />
    </div>
  );
};

export default Main;
