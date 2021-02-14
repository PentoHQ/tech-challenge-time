import { InputHTMLAttributes, FormEvent, ChangeEvent } from "react";
import * as React from "react";
import cssExports from "../../assets/style.module.scss";
interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  label: string;
}

class ExtendedInput extends React.Component<
  MyInputProps & React.InputHTMLAttributes<HTMLInputElement>
> {
  render() {
    const { value, label, ...props } = this.props;
    return (
      <div>
        <label htmlFor={value}>{label}</label>
        <br />
        <input value={value} type="text" {...props} />
      </div>
    );
  }
}

export default ExtendedInput;
