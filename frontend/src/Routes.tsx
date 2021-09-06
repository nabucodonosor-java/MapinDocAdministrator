import React from 'react';
import { Router, Switch, Route, Redirect  } from 'react-router-dom';
import Navbar from './core/components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import MedicoDetails from 'pages/Catalog/components/MedicoDetails';
import Auth from 'pages/Auth';
import Admin from './pages/Admin';
import history from './core/utils/history';

const Routes = () => (
    <Router history={history}>
    <Navbar />
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/doctors"  exact>
                <Catalog />
            </Route>
            <Route path="/doctors/:doctorId">
                <MedicoDetails />
            </Route>
            <Redirect from="/auth" to="/auth/login" exact/>
            <Route path="/auth">
                <Auth />
            </Route>
            <Redirect from="/admin" to="/admin/doctors" exact/>
            <Route path="/admin">
                <Admin />
            </Route>
        </Switch>
    </Router>
);

export default Routes;