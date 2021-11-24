import { Route, Switch } from 'react-router-dom';
import Form from './Form';
import List from './List';

const AdminPrescription = () => {
    return (
       <div>
           <Switch>
               <Route path="/admin/prescriptions" exact>
                    <List />
               </Route>
               <Route path="/admin/prescriptions/:prescriptionId">
                    <Form />
               </Route>
           </Switch>
       </div>
    );
}

export default AdminPrescription;