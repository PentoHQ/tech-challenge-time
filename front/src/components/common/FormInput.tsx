import { InputHTMLAttributes, FormEvent, Props } from "react";
import * as React from 'react'

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  label: string;
  handleInputChange:(e: FormEvent<HTMLInputElement>, label: any) => void;
}

export class MyInput extends React.Component<MyInputProps & React.InputHTMLAttributes<HTMLInputElement>,{}>{

  render() { 
    const 
       { value, label, handleInputChange, ...props } = this.props;
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

// export default MyInput;



// import React, { InputHTMLAttributes, FormEvent } from "react";

// interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {
//   value: string;
//   label: string;
//   handleInputChange:(e: FormEvent<HTMLInputElement>, label: any) => void
// }

// // export class MyInput extends React.Component<MyInputProps & React.InputHTMLAttributes<HTMLInputElement>,{}>{
//   class MyInput extends React.Component<MyInputProps, any> {
//   render() { 
//     const 
//        { value, label, handleInputChange, ...props } = this.props;
//     return(
//     <div className="input">
//       <label htmlFor={value}>{label}</label>
//       <br />
//       <br />
//       <input value={value} type="text" {...props} />
//     </div>
//     )
// };
//   }
// export default MyInput;


// interface MyInputProps extends React.ChangeTargetHTMLProps<HTMLInputElement> {
//   value: string;
//   label: string;
//   handleInputChange:(e: FormEvent<HTMLInputElement>, label: any) => void
// }

// export class MyInput extends React.Component<MyInputProps, any> {
//   render() {
//       const { onValid, onInvalid, ...inputProps } = this.props;
//       return (
//           <input { ...inputProps } />
//       );
//   }
// }