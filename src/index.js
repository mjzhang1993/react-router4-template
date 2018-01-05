/*
   项目入口
*/

import './scss/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import store from './store/index';
import Root from './routes';

const history = createHistory();
const mountNode = document.getElementById('app');

ReactDOM.render((
   <Provider store={store}>
      <ConnectedRouter history={history} basename="">
         <Root/>
      </ConnectedRouter>
   </Provider>
), mountNode);