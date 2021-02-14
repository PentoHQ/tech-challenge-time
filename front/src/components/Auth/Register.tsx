import * as React from "react";

import { AuthForm } from "./Auth";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useState, Dispatch, SetStateAction } from "react";
import useDidMount from "../CustomHooks/DidMount";
import cssExports from "../../assets/style.module.scss";
import { inputData } from "./Auth";

const RegisterFields = [
  {
    name: "username",
    type: "text",
    placeholder: "Please select a username.",
    label: "Username",
  },
  {
    name: "email",
    type: "text",
    placeholder: "Enter your email address here.",
    label: "Email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter your password.",
    label: "Password",
  },
  {
    name: "password_confirmation",
    type: "password",
    placeholder: "Please confirm your password",
    label: "Password Confirmation",
  },
];

export const Register = () => {
  const [formInfo, setFormInfo] = (useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  }) as unknown) as [inputData, Dispatch<SetStateAction<{}>>];

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);
  let history = useHistory();

  useDidMount(() => {
    console.log(formInfo);
    axios
      .post("/api/register", formInfo)
      .then(() => {
        history.push("/login");
      })
      .catch((e) => {
        setErrors(["Something went wrong, please try again"]);
        setFormInfo({
          username: "",
          email: "",
          password: "",
          password_confirmation: "",
        });
        setSubmitted(false);
      });
  }, [submitted]);

  return (
    <div className={cssExports.formStyle}>
      <AuthForm
        fields={RegisterFields}
        errors={errors}
        formInfo={formInfo}
        setFormInfo={setFormInfo}
        setSubmitted={setSubmitted}
      />
    </div>
  );
};
