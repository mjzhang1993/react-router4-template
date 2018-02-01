/*
   创建一个构造store的函数，真正的store在入口文件中创造
*/

import { compose, createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
// 引入thunk 中间件，处理异步操作
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
// 生成 router中间件
const routeMiddleware = routerMiddleware(history);
const middleware = [routeMiddleware, thunk];

/*
	辅助使用chrome浏览器进行redux调试
*/
// 判断当前浏览器是否安装了 REDUX_DEVTOOL 插件
const shouldCompose =
   process.env.NODE_ENV !== 'production' &&
   typeof window === 'object' &&
   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

/*
   如果浏览器安装的 redux 工具，则使用 redux 工具 扩展过的 compose
   compose 是一个 createStore 增强工具，
   他是一个高阶函数，最终会返回新的增强后的 createStore
*/
const composeEnhancers = shouldCompose
   ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify here name, actionsBlacklist, actionsCreators and other options
     })
   : compose;

/*
   调用 applyMiddleware ，使用 middleware 来增强 createStore
*/
const configureStore = composeEnhancers(applyMiddleware(...middleware))(createStore);

export default configureStore;
