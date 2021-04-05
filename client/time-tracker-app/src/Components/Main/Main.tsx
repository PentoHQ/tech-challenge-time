import React, { useEffect, useState } from "react";
import NewSession from "../NewSession";
import "./Main.css";
import { ISession, IStoredSession } from "../../models";
import SessionService from "../../services/sessions.service";
import StoredSessions from "../StoredSessions";
import { AxiosResponse } from "axios";
import Loader from "react-loader-spinner";

const sessionService = new SessionService();

const Main: React.FunctionComponent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [storedSessions, setStoredSessions] = useState<Array<IStoredSession>>(
    []
  );

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    setLoading(true);
    await sessionService.getSessions().then((data) => {
      setStoredSessions(data);
      console.log('FETCH ',data);
      setLoading(false);
    });
  };

  const saveNewSession = async (
    newSession: ISession
  ): Promise<AxiosResponse> => {
    setLoading(true);
    const saveSession = await sessionService.saveSessions(newSession);
    if (saveSession?.status === 200) {
      await fetchSessions();
    }
    setLoading(false);
    return saveSession;
  };

  const deleteSession = async (sessionId: number) => {
    setLoading(true);
    const deleteSession = await sessionService.deleteSession(sessionId);
    if (deleteSession?.status === 200) {
      await fetchSessions();
    }
    setLoading(false);
  };

  return (
    <div className="wrapper">
      <h1 className="primary-color">Time Tracker App</h1>
      <NewSession onSaveNewSession={saveNewSession} loading={loading} />
      {loading ? (
        <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
      ) : null}
      <StoredSessions
        loading={loading}
        storedSessions={storedSessions}
        onDeleteSession={deleteSession}
      />
    </div>
  );
};

export default Main;
