import * as React from "react";

import { AuthForm } from "./Auth";
import { useHistory } from "react-router-dom";
import  axios  from 'axios'
import { useState, Dispatch, SetStateAction, useEffect } from "react";

import { inputData } from './Auth'


const LoginFields = [
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
  }
];


export const Login = () => {

    const [formInfo, setFormInfo] = (useState({
        email: '',
        password: '',
      }) as unknown) as [
        inputData,
        Dispatch<SetStateAction<{}>>
      ];
    
      const [submitted, setSubmitted] = useState(false);
    
      let history = useHistory()
    
      useEffect(() => {
        console.log(formInfo)
        axios.post('/api/login', formInfo)
          .then(() => {
            history.push("/new-time-box")
            console.log('submitted')
          })
          .catch(e => {
            //Todo ERROR HANDLING
            setFormInfo({
              email: '',
              password: '',
            })
          })
      },[submitted])


  return (
    <div style={{width: '80vw', height: '100%', backgroundColor: 'hotPink'}}>
      <AuthForm fields={LoginFields} formInfo={formInfo} setFormInfo={setFormInfo} setSubmitted={setSubmitted}/>
    </div>
  );
};
