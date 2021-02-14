import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Register } from "./components/Auth/Register";
import { Login } from "./components/Auth/Login";
import { TimeBoxCreate } from "./components/TimeBox/TimeBoxCreate";
import { TimeBoxIndex } from "./components/TimeBox/TimeBoxIndex";
import { Home } from "./components/common/Home";

export const App = () => (
  <h1>
    <main>
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/new-time-box" component={TimeBoxCreate} />
            <Route path="/time-boxes" component={TimeBoxIndex} />
            <Route path="" component={Home} />
          </Switch>
        </BrowserRouter>
      </div>
    </main>
  </h1>
);
