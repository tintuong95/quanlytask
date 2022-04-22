import "./App.css";

import { Switch } from "react-router-dom";
import MainLayout from "./templates/MainLayout";
import Main from "./pages/Main";
import Project from "./pages/Project";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import LoginLayout from "./templates/LoginLayout";

function App() {
  return (
    <Switch>
      <LoginLayout exact path="/signin" Component={Signin} />
      <LoginLayout exact path="/login" Component={Login} />
      <MainLayout exact path="/project/:id" Component={Project} />
      <MainLayout exact path="/home" Component={Main} />
      <MainLayout exact path="/" Component={Main} />
      <MainLayout exact path="*" Component={Main} />
    </Switch>
  );
}

export default App;
