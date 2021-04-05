import React, { useEffect, useState } from "react";
import { ISession, IStoredSession } from "../../models";
import SessionService from "../../services/sessions.service";
import NewSession from "../NewSession";
import StoredSessions from "../StoredSessions";
import { AxiosResponse } from "axios";
import Loader from "react-loader-spinner";
import "./Main.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toastify from "../../common/toastify";

const toastify = new Toastify();
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
    const fetchedSessions = await sessionService.getSessions();

    if (fetchedSessions.response) {
      setStoredSessions([]);
      setLoading(false);
      return toastify.errorToast(fetchedSessions.response.statusText);
    }

    if (fetchedSessions) {
      setStoredSessions(fetchedSessions);
      toastify.infoToast("Sessions fetched!");
    }
    setLoading(false);
  };

  const saveNewSession = async (
    newSession: ISession
  ): Promise<AxiosResponse> => {
    setLoading(true);
    const saveSession = await sessionService.saveSessions(newSession);

    if (saveSession.response) {
      toastify.errorToast(saveSession.response.statusText);
    }

    if (saveSession?.status === 200) {
      toastify.successToast("Session saved!");
      await fetchSessions();
    }
    setLoading(false);
    return saveSession;
  };

  const deleteSession = async (sessionId: number) => {
    setLoading(true);
    const deleteSession = await sessionService.deleteSession(sessionId);

    if (deleteSession.response) {
      toastify.errorToast(deleteSession.response.statusText);
    }

    if (deleteSession?.status === 200) {
      toastify.infoToast("Session deleted!");
      await fetchSessions();
    }
    setLoading(false);
  };

  return (
    <div className="wrapper">
      <ToastContainer />
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
