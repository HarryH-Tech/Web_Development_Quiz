import React from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "./components/Context/Auth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Import Custom Components
import App from "./components/App";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import PrivateRoute from "./PrivateRoute";

const Root = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={App} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
    </Switch>
  );
};

ReactDOM.render(
  <AuthProvider>
    <Router>
      <Root />
    </Router>
  </AuthProvider>,
  document.getElementById("root")
);
