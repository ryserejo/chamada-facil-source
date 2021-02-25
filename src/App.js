import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { AuthProvider } from "./services/Auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AttendenceView from "./pages/AttendenceView";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import MyAttendances from "./pages/MyAttendances";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signin" component={SignIn} />
          <PrivateRoute path="/view/:id" component={AttendenceView} />
          <PrivateRoute path="/my-attendances" component={MyAttendances}/>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
