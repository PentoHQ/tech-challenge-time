import { Dispatch, SetStateAction } from "react";
import * as React from "react";
import ExtendedInput from "../common/ExtendedInput";

import cssExports from '../../assets/style.module.scss'
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
  formInfo: inputData;
  errors: string[];
  setFormInfo: Dispatch<SetStateAction<{}>>;
  setSubmitted: Dispatch<SetStateAction<boolean>>;
}

export const AuthForm: React.FC<AuthProps> = (props) => {
  const { fields, formInfo, setFormInfo, setSubmitted, errors} = props;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setFormInfo({ ...formInfo, [e.currentTarget.name]: newValue });
  };

  const FormInput = (field: field) => (
    <ExtendedInput
      name={field.name}
      placeholder={field.placeholder}
      type={field.type}
      value={formInfo[field.name]}
      label={field.label}
      onChange={onChange}
    />
  );

  return (
    <div className={cssExports.formStyle}>
      {errors && <h6 className={cssExports.errors}>{errors}</h6>}
      {fields.map((field: field) => (
        <div key={field.name}>{FormInput(field)}</div>
      ))}
      <button onClick={() => setSubmitted(true)}>Submit</button>
    </div>
  );
};
