import { Route, Switch } from 'react-router-dom';
import Form from './Form';
import List from './List';

const AdminSecretary = () => {
    return (
       <div>
           <Switch>
               <Route path="/admin/secretaries" exact>
                    <List />
               </Route>
               <Route path="/admin/secretaries/:secretaryId">
                    <Form />
               </Route>
           </Switch>
       </div>
    );
}

export default AdminSecretary;