import { Switch } from 'react-router'; 
import NavbarAdmin from 'components/NavbarAdmin';
import PrivateRoute from 'components/Routes/PrivateRoute';
import PageInConstruction from 'components/PageInConstruction';
import HealthPro from './components/HealthPro';
import AdminPlaceService from './components/PlaceService';
import MedicalVisit from './components/MedicalVisit';
import AdminPrescription from './components/Prescription';
import AdminProfession from './components/Profession';
import AdminSpecialization from './components/Specialization';
import AdminSecretary from './components/Secretary';
import AdminSocialPro from './components/SocialAssistence';
import AdminProduct from './components/Product';
import './styles.scss';

const Admin = () => ( 
    <div className="admin-container">
        <NavbarAdmin />
        <div className="admin-content">
            <Switch>
                <PrivateRoute path="/admin/hp">
                    <HealthPro />
                </PrivateRoute>
                <PrivateRoute path="/admin/places">
                    <AdminPlaceService />
                </PrivateRoute>
                <PrivateRoute path="/admin/visits">
                    <MedicalVisit />
                </PrivateRoute>
                <PrivateRoute path="/admin/prescriptions">
                    <AdminPrescription />
                </PrivateRoute>
                <PrivateRoute path="/admin/products">
                    <AdminProduct />
                </PrivateRoute>
                <PrivateRoute path="/admin/social">
                    <AdminSocialPro />
                </PrivateRoute>
                <PrivateRoute path="/admin/professions">
                    <AdminProfession />
                </PrivateRoute>
                <PrivateRoute path="/admin/specializations">
                    <AdminSpecialization />
                </PrivateRoute>
                <PrivateRoute path="/admin/secretaries">
                    <AdminSecretary />
                </PrivateRoute>
                <PrivateRoute path="/admin/users" allowedRoutes={['ROLE_ADMIN']}>
                    <PageInConstruction />
                </PrivateRoute>
            </Switch>
        </div>
    </div>
);

export default Admin;