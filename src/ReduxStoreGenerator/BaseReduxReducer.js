// @flow

/*
* 基础的 Redux Store
* - 即为 Redux 概念中的每一个 reducer
* - 一个 reducer 应该为一个纯函数负责处理对应 action.type 的更改
* */
type State = ImmutableMap<string, any>;

export default class BaseReduxReducer {
  ActionTypes: Object;
  constructor(ActionTypes: Object) {
    this.ActionTypes = ActionTypes;
    (this: any).reduce = this.reduce.bind(this);
    (this: any).subReduce = this.subReduce.bind(this);
  }

  // 必须被复写
  getInitialState(): State {
    throw new Error('A method named "getInitialState" should be redefine');
  }

  // 可以被复写
  subReduce(state: State, action: Object) {
    return state;
  }

  reduce(state: State, action: Object) {
    state = state || this.getInitialState();
    action = action || {};
    const ActionTypes = this.ActionTypes;
    switch (action.type) {
      case ActionTypes.UPDATE_STORE_DATA:
        return state.merge(action.data);
      case ActionTypes.RESET_STORE_DATA:
        return this.getInitialState();
      default:
        return this.subReduce(state, action);
    }
  }
}
