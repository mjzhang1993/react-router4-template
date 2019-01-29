// @flow

/*
   store的创建函数
*/

import {compose, createStore, applyMiddleware} from 'redux';

const middleware = [];

// 辅助使用chrome浏览器进行redux调试
const shouldCompose =
   process.env.NODE_ENV !== 'production' &&
   typeof window === 'object' &&
   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

export default function(
  reducer: Function,
  defaultState: ImmutableMap<string, any>,
  newMiddleware?: Array<Function> = [],
  reduxDevToolConfig?: Object,
) {
  const composeEnhancers = shouldCompose
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(reduxDevToolConfig || {})
    : compose;

  return createStore(
    reducer,
    defaultState,
    composeEnhancers(applyMiddleware(...middleware, ...newMiddleware)),
  );
}
