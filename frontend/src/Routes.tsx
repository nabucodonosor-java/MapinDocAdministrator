import { Router, Switch, Route, Redirect  } from 'react-router-dom';
import Navbar from './components/Navbar';
import history from './utils/history';

const Routes = () => (
    <Router history={history}>
    <Navbar />
        <Switch>
            <Route path="/" exact>
                // Home
            </Route>
            <Route path="/doctors"  exact>
                // DoctorCatalog
            </Route>
            <Route path="/doctors/:doctorsId">
                // DoctorDetails
            </Route>
            <Redirect from="/auth" to="/auth/login" exact/>
            <Route path="/auth">
                // Auth
            </Route>
            <Redirect from="/admin" to="/admin/doctors" exact/>
            <Route path="/admin">
                // Admin
            </Route>
        </Switch>
    </Router>
);

export default Routes;