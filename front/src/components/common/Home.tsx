import * as React from "react";
import {  Link } from "react-router-dom";
import cssExports from "../../assets/style.module.scss";

export const Home = () => {
  return (
    <div className={cssExports.home}>
<div>
        <h2 className={cssExports.title}>TIME BOX</h2>

        <button><Link to={'/login'}>Login</Link></button>
        <button><Link to={'/register'}>Register</Link></button>
        </div>
   </div>
  );
};
