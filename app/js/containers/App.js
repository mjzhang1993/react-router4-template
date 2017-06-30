/*
   App 应用总容器
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';

import AppCom from '../components/AppCom/index';

class App extends Component {
   constructor(props) {
      super(props);
   }
   render() {

      return (
         <AppCom>
            {this.props.children}
         </AppCom>
      );
   }
}

export default connect()(App);
