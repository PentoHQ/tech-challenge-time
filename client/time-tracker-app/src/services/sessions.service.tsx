import axios from "axios";
import {ISession} from "../models";

export default class SessionsService {
  async getSessions() {
    try {
      return axios
        .get(
          "/sessions"
          //         {
          //   headers: { "Access-Control-Allow-Origin": "*", },
          // }
        )
        .then((res) => {
          const { data } = res;
          console.log(data);
          return data;
        });
    } catch (err) {
      console.log(err);
    }
  }

  saveSessions(newSession: ISession) {
    // console.log(newSession);
    try {
      return axios.post("/sessions", newSession).then((res) => {
        // const { data } = res;
        console.log(newSession);
        return newSession;
      });
    } catch (err) {
      console.log(err);
    }
  }

  deleteSession(sessionId: string) {}
}
