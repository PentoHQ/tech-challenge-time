import React from "react";
import Session from "../Session";
import "./Main.css";

const Main: React.FunctionComponent = () => {
  return (
    <div className="wrapper">
      <div>Time Tracker App</div>
      <Session />
    </div>
  );
};

export default Main;
