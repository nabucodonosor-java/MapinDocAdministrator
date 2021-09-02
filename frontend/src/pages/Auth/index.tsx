import { Route, Switch } from 'react-router-dom';
import LoginImage from 'src/assets/images/auth-image.jpeg';
import Login from './components/Login';

import './styles.css';

const Auth = () => ( 
    <div className="auth-container">
        <div className="auth-info">
            <h1 className="auth-info-title">
                Base de Dados <br/> Jácomo Ortopedia
            </h1>
            <p className="auth-info-subtile">
                Base de visitação médica da Jácomo Ortopedia Técnica
            </p>
           <img src={LoginImage} alt="logo" />
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