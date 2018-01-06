/*
   Root, Router 配置
*/
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import App from './containers/App';
import Home from './containers/Home';
import Test from './containers/Test';

const Root = () => (
   <div>
      <Switch>
         <Route path="/" render={props => (
               <App>
                  <Switch>
                     <Route path="/" exact component={Home} />
                     <Route path="/home" component={Home} />
                     <Route path="/test" component={Test} />
                     <Route render={() => <Redirect to="/" />} />
                  </Switch>
               </App>
            )}
         />
         <Route render={() => <Redirect to="/" />} />
      </Switch>
   </div>
);

export default hot(module)(Root);
