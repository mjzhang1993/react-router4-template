// @flow

/*
* 基础的 Redux Actions
* - 即为 Redux 概念中的 actionCreator 集合
* */
import _ from 'lodash'

export default class BaseReduxActions {
  ActionTypes: Object;
  constructor(ActionTypes: Object) {
    this.ActionTypes = ActionTypes;
  }

  // 必须被复写
  get Store(): Object {
    throw new Error('A getter named "Store" mast be exist');
  }

  get state(): ImmutableMap<string, any> {
    return this.Store.getState();
  }

  // 随着 Store 改变不需要复写
  get dispatch(): Function {
    return this.Store.dispatch;
  }

  // 全局 Action 给 globalHandleError 使用
  getGlobalActions(): Object {
    throw new Error('A method named "getGlobalActions" mast be exist');
  }

  updateStoreData(data: Object) {
    this.dispatch({
      type: this.ActionTypes.UPDATE_STORE_DATA,
      data
    })
  }

  resetStoreData() {
    this.dispatch({
      type: this.ActionTypes.RESET_STORE_DATA
    });

  }

  globalHandleError(error: Object): void {
    const globalActions = this.getGlobalActions();

    // 没有 globalActions 则不对错误进行处理
    if (!_.isObject(globalActions)) {
      return;
    }

    switch (error.status) {
      case 400:
        return _.isFunction(globalActions.handleError400) && globalActions.handleError400(error);
      case 401:
        return _.isFunction(globalActions.handleError401) && globalActions.handleError401(error);
      case 404:
        return _.isFunction(globalActions.handleError404) && globalActions.handleError404(error);
      case 408:
        return _.isFunction(globalActions.handleError408) && globalActions.handleError408(error);
      case 0:
        return _.isFunction(globalActions.handleError0) && globalActions.handleError0(error);
      default:
        return _.isFunction(globalActions.handleErrorDefault) && globalActions.handleErrorDefault(error);
    }
  }
}

