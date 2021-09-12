import { Switch } from 'react-router'; 
import NavbarAdmin from './components/NavbarAdmin';
import PrivateRoute from 'core/components/Routes/PrivateRoute';
import Doctors from './components/Doctors';
import PlaceService from './components/PlaceService';
import Visit from './components/Visit';
import './styles.scss';
import PageInConstruction from 'core/components/PageInConstruction';

const Admin = () => ( 
    <div className="admin-container">
        <NavbarAdmin />
        <div className="admin-content">
            <Switch>
                <PrivateRoute path="/admin/doctors">
                    <Doctors />
                </PrivateRoute>
                <PrivateRoute path="/admin/places">
                    <PlaceService />
                </PrivateRoute>
                <PrivateRoute path="/admin/visits">
                    <Visit />
                </PrivateRoute>
                <PrivateRoute path="/admin/specialties">
                    <PageInConstruction />
                </PrivateRoute>
                <PrivateRoute path="/admin/specializations">
                    <PageInConstruction />
                </PrivateRoute>
                <PrivateRoute path="/admin/users" allowedRoutes={['ROLE_ADMIN']}>
                    <h1>Users</h1>
                </PrivateRoute>
            </Switch>
        </div>
    </div>
);

export default Admin;