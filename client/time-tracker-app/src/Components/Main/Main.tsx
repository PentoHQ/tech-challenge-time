import React, { useEffect, useState } from "react";
import { ISession, IStoredSession } from "../../models";
import SessionService from "../../services/sessions.service";
import NewSession from "../NewSession";
import StoredSessions from "../StoredSessions";
import { AxiosResponse } from "axios";
import Loader from "react-loader-spinner";
import "./Main.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toastify from "../../common/toastify";

const toastify = new Toastify();
const sessionService = new SessionService();

export enum OverviewFilter {
  all = "all",
  daily = "daily",
  weekly = "weekly",
  monthly = "monthly",
}

const Main: React.FunctionComponent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [storedSessions, setStoredSessions] = useState<Array<IStoredSession>>(
    []
  );

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async (
    overview: OverviewFilter = OverviewFilter.all
  ) => {
    setLoading(true);

    let fetchedSessions;
    let successToastMessage = "";

    switch (overview) {
      case OverviewFilter.all:
        fetchedSessions = await sessionService.getSessions();
        successToastMessage = "Sessions fetched!";
        break;
      case OverviewFilter.daily:
        fetchedSessions = await sessionService.getTodaySessions();
        successToastMessage = "Today's sessions fetched!";
        break;
      case OverviewFilter.weekly:
        fetchedSessions = await sessionService.getWeeklySessions();
        successToastMessage = "Last 7 days sessions fetched!";
        break;
      case OverviewFilter.monthly:
        fetchedSessions = await sessionService.getMonthlySessions();
        successToastMessage = "Last 31 days sessions fetched!";
        break;
    }

    if (fetchedSessions.response) {
      setStoredSessions([]);
      setLoading(false);
      return toastify.errorToast(fetchedSessions.response.statusText);
    }

    if (fetchedSessions) {
      setStoredSessions(fetchedSessions);
      toastify.infoToast(successToastMessage);
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
        onFetchFilteredSessions={fetchSessions}
      />
    </div>
  );
};

export default Main;
