// @flow

/*
 * store 创建
 * */

import {generateStore, OriginalReduxActions} from '../ReduxStoreGenerator';
import RootReducer from '../modules/Root/RootReducer';
import TestReducer from '../modules/Test/TestReducer';

const store = generateStore({
  root: RootReducer,
  test: TestReducer
}, [], {name: 'global'});

class GlobalReduxActions extends OriginalReduxActions {
  get Store(): Object {
    return store;
  }
  getGlobalActions() {
    return this;
  }
}

export {GlobalReduxActions};

export default store;
