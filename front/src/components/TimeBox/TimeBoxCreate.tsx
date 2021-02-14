import * as React from "react";
import { useHistory } from "react-router-dom";
import Auth from "../../lib/Auth";
import axios from "axios";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import cssExports from "../../assets/style.module.scss";
import { TimeBoxForm } from "./TimeBoxForm";
import useDidMount from "../CustomHooks/DidMount";

export const TimeBoxCreate = () => {
  const [start, setStart] = (useState() as unknown) as [
    number,
    Dispatch<SetStateAction<{}>>
  ];

  const [errors, setErrors] = useState("");

  const [name, setName] = useState("");

  const [end, setEnd] = useState(false);

  const [id, setId] = useState();

  let history = useHistory();

  useDidMount(() => {
    axios
      .post(
        "/api/time-box",
        { name: name },
        { headers: { Authorization: `Bearer ${Auth.getToken()}` } }
      )
      .then((res) => {
        setId(res.data.id);
      })
      .catch((e) => {
        setErrors("There has been a problem");
      });
  }, [start]);

  useDidMount(() => {
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
    <div className={cssExports.formStyle}>
      <TimeBoxForm
        setName={setName}
        name={name}
        errors={errors}
        setStart={setStart}
        setEnd={setEnd}
        start={start}
        end={end}
      />
    </div>
  );
};
