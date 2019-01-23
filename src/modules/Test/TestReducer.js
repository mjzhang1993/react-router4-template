/*
   home 容器的状态管理
*/
import BaseReduxReducer from '../../ReduxStore/BaseReduxReducer';
import TestActionTypes from './constants/TestActionTypes';
import TestSecondActionTypes from './constants/TestSecondActionTypes';

class TestReducer extends BaseReduxReducer{
  getInitialState() {
    return Immutable({
      testValue: 0
    });
  }
}

class TestSecondReducer extends BaseReduxReducer{
  getInitialState() {
    return Immutable({
      testValue: 0
    });
  }
}


export default {
  TestReducer: {
    def: new TestReducer(TestActionTypes)
  },
  TestSecondReducer: new TestSecondReducer(TestSecondActionTypes)
}

// export default new TestReducer(TestActionTypes);

