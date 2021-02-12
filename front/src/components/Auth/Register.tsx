import * as React from "react";
import { AuthForm } from "./Auth";

const RegisterFields = [
  {
    name: "username",
    type: 'text',
    placeholder: "Enter your username here.",
    label: "username",
  },
  {
    name: "email",
    type: 'text',
    placeholder: "Enter your email address here.",
    label: "email",
  },
  {
    name: "password",
    type: 'password',
    placeholder: "Enter your password.",
    label: "password",
  },
  {
    name: "password_confirmation",
    type: 'password',
    placeholder: "Please confirm your password",
    label: "password_confirmation",
  },
];

export const Register = () => {
  return (
    <div style={{width: '80vw', height: '100%', backgroundColor: 'hotPink'}}>
      <AuthForm fields={RegisterFields}/>
    </div>
  );
};
