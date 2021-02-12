import { useState } from 'react'

import * as React from 'react'

import { MyInput } from '../common/FormInput'

export interface field {
  name: string;
  type: 'text' | 'password';
  placeholder: string;
  label: string;
}

// export interface field {
//     username: input;
//     email: input;
//     password: input;
//     password_confirmation: input;
// }

export interface RegisterProps {
  fields: field[];
}

const Register: React.FC<RegisterProps> = (props) => {
  const [registrationInfo, setRegistrationInfo] = useState({})
  const handleInputChange = (e: React.FormEvent<HTMLInputElement>, label: string) => {
    const newValue = e.currentTarget.value;
    setRegistrationInfo({...registrationInfo, [label]: newValue})
  }

  
 
  return (
    <div>
    {props.fields.map((field: field) => {
    <form>
        <div className="field">
              <div className="control">
                <MyInput
                  className="input"
                  name={field.name}
                  placeholder={field.placeholder}
                  type={field.type}
                  value={registrationInfo[field.name]}
                  label={field.label}
                  handleInputChange={handleInputChange}
                />
              </div>
            </div>

    </form>}
    </div>

  )
}
 
export default Register;