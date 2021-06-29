import {
  configureStore,
  ConfigureStoreOptions,
  getDefaultMiddleware,
  Store,
} from '@reduxjs/toolkit';
import { Action, AnyAction, Reducer, ReducersMapObject } from 'redux';
import { BaseSlice, createSubSlice } from './createSlice';

// 给每一个 Slice 注入 store
function beforeMountStore(store: Store) {
  function mountStoreToSlice<SI extends BaseSlice>(sliceInstance: SI): SI {
    sliceInstance.store = store;
    return sliceInstance;
  }

  return { mountStoreToSlice };
}

/**
 * 默认的 middleware 中 serializableCheck 会带来封装代码的报错:
 *  "不让传 函数给 redux state" 实际上我们传入的函数只是个中间态，不会挂载到 state 上
 *  所以这里将他关掉
 * */
function createStore<S = any, A extends Action = AnyAction>(options: {
  reducer: Reducer<S, A> | ReducersMapObject<S, A>;
  devTools?: boolean | ConfigureStoreOptions['devTools'];
}) {
  const { reducer, devTools } = options;
  return configureStore({
    reducer,
    devTools,
    middleware: getDefaultMiddleware({
      serializableCheck: false,
    }),
  });
}

export { beforeMountStore, createStore, BaseSlice, createSubSlice };
