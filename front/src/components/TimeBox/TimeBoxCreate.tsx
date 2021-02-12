import * as React from "react";
import { useHistory } from "react-router-dom";
import Auth from "../../lib/Auth";
import axios from "axios";
import { useState, Dispatch, SetStateAction, useEffect } from "react";

import { TimeBoxForm } from "./TimeBoxForm";

const TimeBoxOptions = [
  {
    name: "start",
    type: "select",
    placeholder: "Click to start your time box",
    label: "start",
  },
  {
    name: "end",
    type: "select",
    placeholder: "When you are ready, click here to end your time box",
    label: "email",
  },
];

export const TimeBoxCreate = () => {
  const [start, setStart] = (useState() as unknown) as [
    number,
    Dispatch<SetStateAction<{}>>
  ];

  const [end, setEnd] = useState(false);

  const [id, setId] = useState();

  let history = useHistory();

  useEffect(() => {
    console.log("setting start");
    axios
      .post(
        "/api/time-box",
        {},
        { headers: { Authorization: `Bearer ${Auth.getToken()}` } }
      )
      .then((res) => {
        console.log(res);
        setId(res.data.id);
      })
      .catch((e) => {
        //Todo ERROR HANDLING
        console.log(e);
      });
  }, [start]);

  useEffect(() => {
    axios
      .post(
        `/api/time-box/${id}`,
        {},
        { headers: { Authorization: `Bearer ${Auth.getToken()}` } }
      )
      .then((res) => {
        history.push("/time-boxes");
      })
      .catch((e) => {
        //Todo ERROR HANDLING
        console.log(e);
      });
  }, [end]);

  return (
    <div style={{ width: "80vw", height: "100%", backgroundColor: "hotPink" }}>
      <TimeBoxForm
        setStart={setStart}
        setEnd={setEnd}
        start={start}
        end={end}
      />
    </div>
  );
};
