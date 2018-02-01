/*
   Test 主页
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';

import TestCom from '../components/Test/index';

class Test extends Component {
   constructor(props) {
      super(props);
   }
   render() {
      return <TestCom {...this.props} />;
   }
}

export default connect()(Test);
