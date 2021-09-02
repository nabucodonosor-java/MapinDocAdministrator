import { Router, Switch, Route, Redirect  } from 'react-router-dom';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import Catalog from './pages/Catalog';
import DoctorDetails from './pages/Catalog/components/DoctorDetails';
import Home from './pages/Home';
import history from './utils/history';

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
            <Route path="/doctors/:doctorsId">
                <DoctorDetails />
            </Route>
            <Redirect from="/auth" to="/auth/login" exact/>
            <Route path="/auth">
                <Auth />
            </Route>
            <Redirect from="/admin" to="/admin/doctors" exact/>
            <Route path="/admin">
               
            </Route>
        </Switch>
    </Router>
);

export default Routes;