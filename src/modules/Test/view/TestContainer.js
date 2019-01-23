/*
   Test 主页
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';

import TestRootView from './TestRootView';

class TestContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <TestRootView {...this.props} />;
  }
}

export default connect(
  state => ({
    testValue: state.getIn(['test', 'TestReducer', 'testValue'])
  })
)(TestContainer);
