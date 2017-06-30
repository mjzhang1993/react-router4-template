/*
   Root, Router 配置
*/
import React from 'react';
import {Provider} from 'react-redux';
// import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {Route, Switch, Redirect} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';

// import history from './store/configureStore';
import store from './store/index';
import {App, Home, Test} from './containers/index';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

const Root = () => (
   <Provider store={store}>
      <ConnectedRouter history={history} >
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
      </ConnectedRouter>
   </Provider>
);


export default Root;
