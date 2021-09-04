import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Form from './Form';
import List from './List';

const Doctors = () => {
    return (
       <div>
           <Switch>
               <Route path="/admin/doctors" exact>
                    <List />
               </Route>
               <Route path="/admin/doctors/:doctorId">
                    <Form />
               </Route>
           </Switch>
       </div>
    );
}

export default Doctors;