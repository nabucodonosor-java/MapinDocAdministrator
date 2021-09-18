import React from 'react';
import { Router, Switch, Route, Redirect  } from 'react-router-dom';
import Navbar from './core/components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import MedicoDetails from 'pages/Catalog/components/MedicoDetails';
import Auth from 'pages/Auth';
import Admin from './pages/Admin';
import history from './core/utils/history';
import VisitDT from 'pages/Reports/VisitDT';
import VisitDTbyPeriod from 'pages/Reports/VisitDTbyPeriod';
import DoctorDTbyDaysOfWeek from 'pages/Reports/DoctorDTbyDaysOfWeek';
import PageInConstruction from 'core/components/PageInConstruction';

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

            <Route path="/visits" exact>
                <VisitDT />
            </Route>

            <Route path="/visits/byPeriod"  exact>
                <VisitDTbyPeriod />
            </Route>           

            <Route path="/report/doctors/byDays" exact>
                <DoctorDTbyDaysOfWeek />
            </Route>

            <Route path="/lab" exact>
                <PageInConstruction />
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