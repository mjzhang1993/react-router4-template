/*
   Root, Router 配置
*/
import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import {App, Home, Test} from './containers/index';

const Root = () => (
   <div>
      <Switch>
         <Route path="/" render={(props) => (
            <App>
               <Switch>
                  <Route path="/" exact component={Home}/>
                  <Route path="/home" component={Home}/>
                  <Route path="/test" component={Test}/>
                  <Redirect from="/undefined" to={{pathname: '/', search: '?mold=redirect'}}/>
               </Switch>
            </App>
         )}/>
         <Route render={() => (<Redirect to="/"/>)}/>
      </Switch>
   </div>
);

export default Root;
