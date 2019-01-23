// @flow

import store, {GlobalReduxActions} from '../../ReduxStore';
import RootActionTypes from './constants/RootActionTypes';

class RootActions extends GlobalReduxActions{
  get Store(): Object {
    return store;
  }
  changeStoreData(data) {
    this.updateStoreData(data);
  }

  handleError400() {
    this.updateStoreData({
      errorStatus: '400'
    })
  }
  handleError401() {
    this.updateStoreData({
      errorStatus: '401'
    })
  }
  handleError404() {
    this.updateStoreData({
      errorStatus: '404'
    })
  }
  handleError408() {
    this.updateStoreData({
      errorStatus: '408'
    })
  }
  handleError0() {
    this.updateStoreData({
      errorStatus: '0'
    })
  }
  handleErrorDefault() {
    this.updateStoreData({
      errorStatus: 'default'
    })
  }
}

export default new RootActions(RootActionTypes);
