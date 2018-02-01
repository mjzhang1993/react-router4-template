/*
   Root, Router 配置
*/
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import lazyLoad from './lazyLoad';
import App from '../containers/App';
/*
* 注意：以下注释部分也是实现按需加载的另一种方式，
*  更详细的说明参考 http://blog.csdn.net/mjzhang1993/article/details/79094594
* */
// import Home from 'bundle-loader?lazy&name=Home!../containers/Home';
// import Test from 'bundle-loader?lazy&name=Test!../containers/Test';

const Home = lazyLoad(() => import(/* webpackChunkName: "Home" */ '../containers/Home'));
const Test = lazyLoad(() => import(/* webpackChunkName: "Test" */ '../containers/Test'));

const Root = () => (
   <div>
      <Switch>
         <Route
            path="/"
            render={props => (
               <App>
                  <Switch>
                     {/* <Route path="/" exact component={lazyLoad(Home)} />
                     <Route path="/home" component={lazyLoad(Home)} />
                     <Route path="/test" component={lazyLoad(Test)} /> */}
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
