import * as React from "react";

// import { AuthForm } from "../Auth/Auth";
import { useHistory } from "react-router-dom";
import Auth from "../../lib/Auth";
import axios from "axios";
import { useState, useEffect } from "react";

export const TimeBoxIndex: React.FC = () => {
  const [timeBoxes, setTimeBoxes] = useState([]);

  useEffect(() => {
    console.log("setting start");
    axios
      .get("/api/time-boxes", {
        headers: { Authorization: `Bearer ${Auth.getToken()}` },
      })
      .then((res) => {
        console.log(res);
        setTimeBoxes(res.data);
      })
      .catch((e) => {
        //Todo ERROR HANDLING
        console.log(e);
      });
  }, []);

  {
    console.log(timeBoxes);
  }

  return (
    <div
      style={{
        display: "flex",
        width: "600px",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {timeBoxes &&
        timeBoxes.map((timeBox) => (
          <div
            style={{
              height: "150px",
              width: "150px",
              border: "2px solid black",
              display: "flex",
            }}
          >
            {timeBox.created_at}
          </div>
        ))}
    </div>
  );
};
