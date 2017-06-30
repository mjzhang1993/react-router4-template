/*
   App 容器组件的子组件，顶部状态栏
*/
import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
// import Test from '../../containers/Test.js';

import '../../../scss/app.scss';

class AppCom extends Component {
   constructor(props) {
      super(props);
   }
   render() {

      return (
         <div id="app-container">
            <header className="app-header">成员列表</header>
            <div className="app-body">
               {this.props.children}
               {/* <Link to="/test">点击进入 Test 页面</Link> */}
               {/* Route 可以像正常组件一样写在这里 */}
               {/* <Route path="/test" component={Test}/> */}
            </div>
         </div>
      );
   }
}

export default withRouter(AppCom)
