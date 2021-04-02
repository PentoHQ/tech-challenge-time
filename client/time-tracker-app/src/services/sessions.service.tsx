import axios from "axios";

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

  saveSessions() {
      try {
          return axios
              .post(
                  "/sessions"
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

  deleteSession(sessionId: string) {}
}
