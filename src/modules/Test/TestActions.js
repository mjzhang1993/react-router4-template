
import BaseReduxActions from '../../ReduxStore/BaseReduxActions'
import TestActionTypes from './constants/TestActionTypes';

class TestActions extends BaseReduxActions {
  increase() {
    console.log(this.state.toJS());
    const testValue = this.Store.getState().getIn(['test', 'TestReducer', 'testValue']);
    // console.log(testValue);
    this.updateStoreData({
      testValue: testValue + 1
    });
  }
}

export default new TestActions(TestActionTypes);
