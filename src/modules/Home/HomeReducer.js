/*
   home 容器的状态管理
*/
import BaseReduxReducer from '../../ReduxStore/BaseReduxReducer';

class HomeReducer extends BaseReduxReducer{
  getInitialState() {
    return Immutable({
      memberList: [],
      inputInfo: {
        name: '',
        tel: ''
      },
      title: 'old title'
    });
  }
  subReduce(state, action) {
    switch (action.type) {
      case this.ActionTypes.CHANGE_INPUT_INFO:
        return state.set('inputInfo', Immutable(action.msg));
      case this.ActionTypes.GET_MEMBER_LIST:
        return state.set('memberList', Immutable(action.msg));
      default:
        return state;
    }
  }
}

export default HomeReducer;

