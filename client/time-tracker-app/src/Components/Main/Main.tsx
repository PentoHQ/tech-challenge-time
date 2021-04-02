import React, { useEffect, useState } from "react";
import Session from "../Session";
import "./Main.css";
import axios from "axios";

const Main: React.FunctionComponent = () => {
  return (
    <div className="wrapper">
      <div>Time Tracker App</div>
      <Session />
    </div>
  );
};

export default Main;
