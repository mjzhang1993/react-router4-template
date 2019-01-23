// @flow

/*
   创建唯一 store 状态树
*/
import _ from 'lodash';
import {combineReducers} from 'redux-immutable';
import BaseReduxReducer from './BaseReduxReducer';
import configureStore from './configureStore';

type ReducerType = {
  reduce: Function
}

// 功能：将传入的 reducer 对象提取出 reduce 函数
function generateReducer(originalReducers: Object) {
  return Object.keys(originalReducers).reduce((prev, current) => {
    const currentReducer = originalReducers[current];
    const isReducer = BaseReduxReducer.prototype.isPrototypeOf(currentReducer);

    prev[current] = isReducer ? currentReducer.reduce : generateReducer(currentReducer);
    return prev;
  }, {});
}

// 功能 将树状结构的 reducer 通过 combineReducer 转化为 redux 可用
function toCombineReducers(reducers: Object) {
  const tempReducers = Object.keys(reducers).reduce((prev, current) => {
    const currentReducer = reducers[current];

    prev[current] = _.isFunction(currentReducer) ? currentReducer : toCombineReducers(currentReducer);
    return prev;
  }, {});
  return combineReducers(tempReducers);

}
/*
*  给 store 新增 注册|删除|重置 Reducer 的功能
* */
const generateStore = (
  defaultReducer: ReducerType,
  middleware?: Array<Function>,
  reduxDevToolConfig?: Object
) => {
  const reducer = generateReducer(defaultReducer);
  const store = configureStore(toCombineReducers(reducer), Immutable({}), middleware, reduxDevToolConfig);

  store.asyncReducers = {};
  store.staticReducers = reducer;

  store.injectReducer = (reducerName: string, newReducer: ReducerType, parentReducerName?: string) => {
    if (!parentReducerName) {
      const isRepeated = _.has(store.staticReducers, reducerName) || _.has(store.asyncReducers, reducerName);

      // reducerName 不可重复
      if (isRepeated) {
        throw new Error(`${reducerName} already exists in store, Please rewrite it`);
      }

      // 传入的 reducerName 有值则添加，无值则刷新
      store.asyncReducers[reducerName] = newReducer.reduce;
      return store.replaceReducer(toCombineReducers({
        ...store.staticReducers,
        ...store.asyncReducers
      }))
    }

    // 由于 asyncReducers 与 staticReducers 不会重复所以一下判断一正一负或者都是 false
    const isStatic = _.has(store.staticReducers, parentReducerName);
    const isAsync = _.has(store.asyncReducers, parentReducerName);

    if (isStatic) {
      const oldReducer = _.get(store.staticReducers, parentReducerName);

      // 如果是函数则表示没有可扩展设定，需要抛出错误
      if (_.isFunction(oldReducer)) {
        throw new Error(`${parentReducerName} is is not extensible, please check ${parentReducerName} module and return a "Object" instead of "Instance" `)
      }

      _.set(store.staticReducers, parentReducerName, {...oldReducer, [reducerName]: newReducer.reduce});
    } else if (isAsync) {
      const oldReducer = _.get(store.asyncReducers, parentReducerName);

      // 如果是函数则表示没有可扩展设定，需要抛出错误
      if (_.isFunction(oldReducer)) {
        throw new Error(`${parentReducerName} is is not extensible, please check ${parentReducerName} module and return a "Object" instead of "Instance" `)
      }

      _.set(store.asyncReducers, parentReducerName, {...oldReducer, [reducerName]: newReducer.reduce});
    } else {
      // 都为 false 则重新创建一个
      _.set(store.asyncReducers, parentReducerName, {[reducerName]: newReducer.reduce});
    }

    return store.replaceReducer(toCombineReducers({
      ...store.staticReducers,
      ...store.asyncReducers
    }))

  };

  store.removeReducer = (reducerName: string) => {
    if (_.has(store.asyncReducers, reducerName)) {
      store.asyncReducers = _.omit(store.asyncReducers, [reducerName]);
      store.replaceReducer(toCombineReducers({
        ...store.staticReducers,
        ...store.asyncReducers
      }))
    }
  };

  store.resetReducer = (excludeAsyncReducer: boolean) => {
    store.replaceReducer(toCombineReducers({
      ...store.staticReducers,
      ...(excludeAsyncReducer ? {} : store.asyncReducers)
    }))
  };

  return store;
};

export default generateStore;
