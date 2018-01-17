/*
   Root, Router 配置
*/
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import lazyLoad from './lazyLoad';
import App from '../containers/App';
import Home from 'bundle-loader?lazy&name=home!../containers/Home';
import Test from 'bundle-loader?lazy&name=test!../containers/Test';

const Root = () => (
   <div>
      <Switch>
         <Route path="/" render={props => (
               <App>
                  <Switch>
                     <Route path="/" exact component={lazyLoad(Home)} />
                     <Route path="/home" component={lazyLoad(Home)} />
                     <Route path="/test" component={lazyLoad(Test)} />
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
