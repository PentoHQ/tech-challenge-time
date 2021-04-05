import axios from "axios";
import { ISession } from "../models";

export default class SessionsService {
  async getSessions() {
    try {
      return axios.get("/sessions").then((res) => {
        const { data } = res;
        return data.data;
      });
    } catch (err) {
      return err;
    }
  }

  saveSessions(newSession: ISession) {
    try {
      return axios.post("/sessions", newSession).then((res) => {
        return res;
      });
    } catch (err) {
      return err;
    }
  }

  deleteSession(sessionId: number) {
    try {
      return axios.delete(`/sessions/${sessionId}`, {
        params: { id: sessionId },
      });
    } catch (err) {
      return err;
    }
  }
}
