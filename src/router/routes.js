/*
   Root, Router 配置
*/
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import lazyLoad from './lazyLoad';
import RootContainer from '../modules/Root/view/RootContainer';
// import Home from '../containers/Home';
// import Test from '../containers/Test';

const Home = lazyLoad(() => import(/* webpackChunkName: "Home" */ '../modules/Home'));
const HomeTwo = lazyLoad(() => import(/* webpackChunkName: "HomeTwo" */ '../modules/HomeTwo'));
const Test = lazyLoad(() => import(/* webpackChunkName: "Test" */ '../modules/Test/view/TestContainer'));

const Root = () => (
   <div>
      <Switch>
         <Route
            path="/"
            render={props => (
               <RootContainer>
                  <Switch>
                     <Route path="/" exact component={Home} />
                     <Route path="/homeTwo" component={HomeTwo} />
                     <Route path="/home" component={Home} />
                     <Route path="/test" component={Test} />
                     <Route render={() => <Redirect to="/" />} />
                  </Switch>
               </RootContainer>
            )}
         />
         <Route render={() => <Redirect to="/" />} />
      </Switch>
   </div>
);

export default hot(module)(Root);
