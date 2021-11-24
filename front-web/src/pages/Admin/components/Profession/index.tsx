import { Route, Switch } from 'react-router-dom';
import Form from './Form';
import List from './List';

const AdminProfession = () => {
    return (
       <div>
           <Switch>
               <Route path="/admin/professions" exact>
                    <List />
               </Route>
               <Route path="/admin/professions/:professionId">
                    <Form />
               </Route>
           </Switch>
       </div>
    );
}

export default AdminProfession;