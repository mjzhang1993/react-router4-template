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
import Root from './router/routes';

const history = createHistory();
const mountNode = document.getElementById('app');

/*
   react-redux 提供 Provider 组件，
   被 Provider 组件包裹的整个 APP 中的每个组件，都可以通过 connect 去连接 store
*/
ReactDOM.render(
   <Provider store={store}>
      <ConnectedRouter history={history} basename="">
         <Root />
      </ConnectedRouter>
   </Provider>,
   mountNode
);
