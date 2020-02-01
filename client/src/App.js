import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store';
import jwt_decode from "jwt-decode";
import setAuthHeaderToken from "./core/setAuthHeaderToken";
import { setCurrentUser } from "./actions/auth.action";

import Home from "./components/Home";
import Register from "./components/auth/Register/Register";
import Login from "./components/auth/Login/Login";
import Dashboard from './components/dashboard/Dashboard';
import Rtsp from './components/rtsp/Rtsp';
import PrivateRoute from './components/private-route/privateRoute';

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";


// Validate id user is logged in
if (localStorage.user_token) {
    // Set auth token header auth
    const token = localStorage.user_token;
    setAuthHeaderToken(token);
    const user = jwt_decode(token);
    console.log(user)
    store.dispatch(setCurrentUser(user));
}


class App extends Component {
    
  render() {
    return (
     <Provider store={store}>
        <Router>
            <div className="App">
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/rtsp" component={Rtsp} />
            </Switch>
            </div>
        </Router>
      </Provider>
    );
  }
}
export default App;