/*
   App 容器组件的子组件，顶部状态栏
*/
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'; // 类型检查捕获错误

import '../../scss/app.scss';

class AppCom extends Component {
   constructor(props) {
      super(props);
   }
   render() {
      const { title, location } = this.props;
      const currentKey = location.pathname;
      console.log(currentKey);

      return (
         <div id="app-container">
            <header className="app-header">{title}</header>
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
// 设置默认值
AppCom.defaultProps = {
   title: 'default title'
};

// 规定类型
AppCom.propTypes = {
   title: PropTypes.string
};

export default withRouter(AppCom);
