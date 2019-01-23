// @flow

import {OriginalReduxActions} from '../ReduxStoreGenerator';
import GlobalActions from '../modules/Root/RootActions';
import store from './index';

class BaseReduxActions extends OriginalReduxActions {
  get Store(): Object {
    return store;
  }

  getGlobalActions() {
    return GlobalActions;
  }
}

export default BaseReduxActions;
