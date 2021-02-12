import * as React from "react";
// import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './components/Auth/Login'
// import Register from './components/Auth/Register'
// import Nav from './components/common/Nav'
// import Home from './components/common/Home'
// import TimeBoxCreate from './components/TimeBox/TimeBoxCreate'
export interface HomeProps {
  userName: string;
  lang: string;
}
export const Home = (props: HomeProps) => (
  <h1>
     <main>
        <div>
          <Nav />
          <Switch>

            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/time-boxes' component={Home} />
            <Route path='/new-time-box' component={TimeBoxCreate} />
          </Switch>
        </div>
      </main>
  </h1>
);