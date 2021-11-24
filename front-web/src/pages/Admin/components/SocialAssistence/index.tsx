import { Route, Switch } from 'react-router-dom';
import Form from './Form';
import List from './List';

const AdminSocialPro = () => {
    return (
       <div>
           <Switch>
               <Route path="/admin/social" exact>
                    <List />
               </Route>
               <Route path="/admin/social/:socialId">
                    <Form />
               </Route>
           </Switch>
       </div> 
    );
}

export default AdminSocialPro;