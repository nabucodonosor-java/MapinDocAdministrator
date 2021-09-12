import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Form from './Form';
import List from './List';

const Visit = () => {
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

export default Visit;