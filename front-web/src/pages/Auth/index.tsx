import AuthImage from "assets/images/auth.gif";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import "./styles.scss";

const Auth = () => (
  <div className="auth-container">
    <div className="auth-info">
      <img src={AuthImage} alt="sem conexão com a internet..." />
    </div>
    <div className="auth-content">
      <Switch>
        <Route path="/auth/login">
          <Login />
        </Route>
        <Route path="/auth/register">
          <h1>PÁGINA EM CONSTRUÇÃO</h1>
        </Route>
        <Route path="/auth/recover">
          <h1>PÁGINA EM CONSTRUÇÃO</h1>
        </Route>
      </Switch>
    </div>
  </div>
);

export default Auth;
