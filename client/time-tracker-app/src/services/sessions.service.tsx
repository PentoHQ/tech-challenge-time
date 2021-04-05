import axios from "axios";
import { ISession } from "../models";

export default class SessionsService {
  getSessions() {
    return axios
      .get("/sessions")
      .then((res) => {
        const { data } = res;
        return data.data;
      })
      .catch((error) => {
        return error;
      });
  }

  getWeeklySessions() {
    return axios
      .get("/sessions/week")
      .then((res) => {
        const { data } = res;
        return data.data;
      })
      .catch((error) => {
        return error;
      });
  }

  getMonthlySessions() {
    return axios
      .get("/sessions/month")
      .then((res) => {
        const { data } = res;
        return data.data;
      })
      .catch((error) => {
        return error;
      });
  }

  saveSessions(newSession: ISession) {
    return axios
      .post("/sessions", newSession)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  }

  deleteSession(sessionId: number) {
    return axios
      .delete(`/sessions/${sessionId}`, {
        params: { id: sessionId },
      })
      .catch((error) => {
        return error;
      });
  }
}
