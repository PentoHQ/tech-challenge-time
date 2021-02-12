import * as React from "react";

import { AuthForm } from "../Auth/Auth";
import { useHistory } from "react-router-dom";
import Auth from '../../lib/Auth'
import  axios  from 'axios'
import { useState, Dispatch, SetStateAction, useEffect } from "react";

import { TimeBoxForm } from './TimeBoxForm'

import { inputData } from '../Auth/Auth'


const TimeBoxOptions = [
  {
    name: "start",
    type: 'select',
    placeholder: "Click to start your time box",
    label: "start",
  },
  {
    name: "end",
    type: 'select',
    placeholder: "When you are ready, click here to end your time box",
    label: "email",
  }
];

export const TimeBoxCreate = () => {

    const [start, setStart] = useState() as unknown as [
        inputData,
        Dispatch<SetStateAction<{}>>
      ];
    
      const [end, setEnd] = useState(false);

      const [id, setId] = useState()
    
      let history = useHistory()
    
      useEffect(() => {
        axios.post('/api/time-box', {},  {headers: { Authorization: `Bearer ${Auth.getToken()}`}})
          .then((res) => {
            setId(res.data.id)
          })
          .catch(e => {
            //Todo ERROR HANDLING
            console.log(e)
          })
      },[setStart])

      useEffect(() => {
        axios.post(`/api/time-box/${id}`, {},  {headers: { Authorization: `Bearer ${Auth.getToken()}`}})
          .then((res) => {
            history.push("/time-boxes")
          })
          .catch(e => {
            //Todo ERROR HANDLING
            console.log(e)
          })
      },[setEnd])



  return (
    <div style={{width: '80vw', height: '100%', backgroundColor: 'hotPink'}}>
      <TimeBoxForm setStart={setStart} setEnd={setEnd}/>
    </div>
  );
};
