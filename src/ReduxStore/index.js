// @flow

/*
* store 创建
* */

import {generateStore, BaseActionTypesCreator, OriginalReduxActions} from '../ReduxStoreGenerator';
import RootReducer from '../modules/Root/RootReducer';
import TestReducer from '../modules/Test/TestReducer';

const store = generateStore({
  root: RootReducer,
  test: TestReducer
}, [], {name: 'global'});

class GlobalReduxActions extends OriginalReduxActions{
  getGlobalActions() {
    return this;
  }
}

export {BaseActionTypesCreator, GlobalReduxActions};

export default store;
