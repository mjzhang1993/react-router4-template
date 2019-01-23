// @flow

/*
   home 容器的状态管理
*/

import BaseReduxReducer from '../../ReduxStore/BaseReduxReducer';
import RootActionTypes from './constants/RootActionTypes';

type State = ImmutableMap<string, any>

class RootReducer extends BaseReduxReducer {
  getInitialState(): State {
    return Immutable({
      subTitle: 'default subTitle',
      errorStatus: 'null'
    })
  }
}

export default new RootReducer(RootActionTypes);
