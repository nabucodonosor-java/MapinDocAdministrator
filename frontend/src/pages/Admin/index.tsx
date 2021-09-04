import { Switch } from 'react-router';
import NavbarAdmin from './components/NavbarAdmin';
import PrivateRoute from 'core/components/Routes/PrivateRoute';
import Especialidade from './components/Especialidade';
import Especializacao from './components/Especializacao';
import Local from './components/Local';
import Doctors from './components/Doctors';
import './styles.scss';
import DashServicos from './components/DashServicos';

const Admin = () => (
    <div className="admin-container">
        <NavbarAdmin />
        <div className="admin-content">
            <Switch>
                <PrivateRoute path="/admin/doctors">
                    <Doctors />
                </PrivateRoute>
                <PrivateRoute path="/admin/specialties">
                    <Especialidade />
                </PrivateRoute>
                <PrivateRoute path="/admin/specializations">
                    <Especializacao />
                </PrivateRoute>
                <PrivateRoute path="/admin/places">
                   <Local />
                </PrivateRoute>
                <PrivateRoute path="/admin/lab">
                   <DashServicos />
                </PrivateRoute>
                <PrivateRoute path="/admin/users" allowedRoutes={['ROLE_ADMIN']}>
                    <h1>Users</h1>
                </PrivateRoute>
            </Switch>
        </div>
    </div>
);

export default Admin;