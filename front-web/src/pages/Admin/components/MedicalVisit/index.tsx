import { Route, Switch } from 'react-router-dom';
import Form from './Form';
import List from './List';

const MedicalVisit = () => {
    return (
       <div>
            <Switch>
               <Route path="/admin/visits" exact>
                    <List />
               </Route>
               <Route path="/admin/visits/:visitId">
                    <Form />
               </Route>
           </Switch>
       </div>
    );
}

export default MedicalVisit;