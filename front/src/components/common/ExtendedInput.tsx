import { InputHTMLAttributes, FormEvent,ChangeEvent  } from "react";
import * as React from 'react'

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  label: string;
}

class ExtendedInput extends React.Component<MyInputProps & React.InputHTMLAttributes<HTMLInputElement>>{

  render() { 
    const 
       { value, label,...props } = this.props;
    return(
    <div className="input">
      <label htmlFor={value}>{label}</label>
      <br />

      <br />
      <input value={value} type="text" {...props} />
    </div>
    )
};


}

export default ExtendedInput;
