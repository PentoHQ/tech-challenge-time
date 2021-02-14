import * as React from "react";
import Auth from "../../lib/Auth";
import { AuthForm } from "./Auth";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import cssExports from "../../assets/style.module.scss";
import useDidMount from "../CustomHooks/DidMount";

import { inputData } from "./Auth";

const LoginFields = [
  {
    name: "email",
    type: "text",
    placeholder: "Enter your email address here.",
    label: "email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter your password.",
    label: "password",
  },
];

export const Login = () => {
  const [formInfo, setFormInfo] = (useState({
    email: "",
    password: "",
  }) as unknown) as [inputData, Dispatch<SetStateAction<{}>>];

  const [submitted, setSubmitted] = useState(false);

  let history = useHistory();

  const [errors, setErrors] = useState([]);

  useDidMount(() => {
    axios
      .post("/api/login", formInfo)
      .then((res) => {
        Auth.setToken(res.data.token);
        history.push("/new-time-box");
      })
      .catch((e) => {
        setErrors(["Something went wrong, please try again"]);
        setFormInfo({
          email: "",
          password: "",
        });
        setSubmitted(false);
      });
  }, [submitted]);

  return (
    <div>
      <AuthForm
        fields={LoginFields}
        formInfo={formInfo}
        errors={errors}
        setFormInfo={setFormInfo}
        setSubmitted={setSubmitted}
      />
    </div>
  );
};
