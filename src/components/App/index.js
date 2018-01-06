/*
   App 容器组件的子组件，顶部状态栏
*/
import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

import '../../scss/app.scss';

@withRouter
export default class AppCom extends Component {
   constructor(props) {
      super(props);
   }
   componentWillMount() {
      // 测试装饰器
      function decorator(target) {
         target.prototype.getName = function () {
            alert('decorator', this.name);
         }
      }

      @decorator
      class Decor {
         constructor(name) {
            this.name = name;
         }
      }

      const decor = new Decor('test decor');
      decor.getName();

      // 测试 Promise
      if (Promise) {
         alert('have Promise');
      } else {
         alert('no Promise ❎');
      }

      // 测试 异步函数
      async function test() {
         await new Promise(function (resolve) {
            resolve('test')
         })
      }

      test().then(res => {
         alert('have async');
      })
   }
   render() {
		const currentKey = this.props.location.pathname;
      console.log(currentKey);

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
