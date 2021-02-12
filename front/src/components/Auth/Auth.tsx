import { useState, Dispatch, SetStateAction, useEffect, useHistory } from "react";
import  axios  from 'axios'
import * as React from "react";
import  ExtendedInput  from "../common/ExtendedInput";

export interface field {
  name: string;
  type: string;
  placeholder: string;
  label: string;
}

export interface inputData {
  [key: string]: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthProps {
  fields: field[];
}

export const AuthForm: React.FC<AuthProps> = (props) => {
  const [registrationInfo, setRegistrationInfo] = (useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
  }) as unknown) as [
    inputData,
    Dispatch<SetStateAction<{}>>
  ];

  const [submitted, setSubmitted] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setRegistrationInfo({ ...registrationInfo, [e.currentTarget.name]: newValue });
  }

  let history = useHistory()

  useEffect(() => {
    console.log(registrationInfo)
    axios.post('/api/register', registrationInfo)
      .then(() => {
        history.push("/login")
        console.log('submitted')
      })
      .catch(e => {
        //Todo ERROR HANDLING
        setRegistrationInfo({
          username: '',
          email: '',
          password: '',
          password_confirmation: ''
        })
      })
  },[submitted])

  const FormInput = (field: field) =>
    <ExtendedInput
      name={field.name}
      placeholder={field.placeholder}
      type={field.type}
      value={registrationInfo[field.name]}
      label={field.label}
      onChange={onChange}
    />

    return (
      <div style={{ height: "80vh" }}>
        {props.fields.map((field: field) => 
        <div key={field.name}>
              {FormInput(field)}
              </div>
          )}
          <button onClick={()=>setSubmitted(true)}>Register</button>
      </div>
    );
};
