import { Route, Switch } from 'react-router-dom';
import Form from './Form';
import List from './List';

const HealthPro = () => {
    return (
       <div>
           <Switch>
               <Route path="/admin/hp" exact>
                    <List />
               </Route>
               <Route path="/admin/hp/:hpId">
                    <Form />
               </Route>
           </Switch>
       </div>
    );
}

export default HealthPro;