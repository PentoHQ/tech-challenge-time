import { Dispatch, SetStateAction } from "react";
import * as React from "react";
import ExtendedInput from "../common/ExtendedInput";

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
  setFormInfo: Dispatch<SetStateAction<{}>>;
  setSubmitted: Dispatch<SetStateAction<boolean>>;
}

export const TimeBoxForm: React.FC<AuthProps> = (props) => {
  const { fields, formInfo, setFormInfo, setSubmitted } = props;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setFormInfo({ ...formInfo, [e.currentTarget.name]: newValue });
  };

  return (
    <div>
      <div style={{ height: "100px" }}>
        <button onClick={() => setStart(true)}>Submit</button>
      </div>
      <div style={{ height: "100px" }}>
        <button onClick={() => setEnd(true)}>Submit</button>
      </div>
    </div>
  );
};
