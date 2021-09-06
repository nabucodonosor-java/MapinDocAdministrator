import { Switch } from 'react-router'; 
import NavbarAdmin from './components/NavbarAdmin';
import PrivateRoute from 'core/components/Routes/PrivateRoute';
import Doctors from './components/Doctors';
import './styles.scss';
 
const Admin = () => ( 
    <div className="admin-container">
        <NavbarAdmin />
        <div className="admin-content">
            <Switch>
                <PrivateRoute path="/admin/doctors">
                    <Doctors />
                </PrivateRoute>
                
                <PrivateRoute path="/admin/users" allowedRoutes={['ROLE_ADMIN']}>
                    <h1>Users</h1>
                </PrivateRoute>
            </Switch>
        </div>
    </div>
);

export default Admin;