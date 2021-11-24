import { Route, Switch } from 'react-router-dom';
import Form from './Form';
import List from './List';

const AdminPlaceService = () => {
    return (
       <div>
           <Switch>
               <Route path="/admin/places" exact>
                    <List />
               </Route>
               <Route path="/admin/places/:placeId">
                    <Form />
               </Route>
           </Switch>
       </div>
    );
}

export default AdminPlaceService;