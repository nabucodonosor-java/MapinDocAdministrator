import { Route, Switch } from 'react-router-dom';
import Form from './Form';
import List from './List';

const AdminSpecialization = () => {
    return (
       <div>
           <Switch>
               <Route path="/admin/specializations" exact>
                    <List />
               </Route>
               <Route path="/admin/specializations/:specializationId">
                    <Form />
               </Route>
           </Switch>
       </div>
    );
}

export default AdminSpecialization;