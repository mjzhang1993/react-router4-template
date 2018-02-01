/*
   Test 容器组件的子组件，信息展示
*/
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TestForm from './TestForm';

import '../../scss/home.scss';

/*
   @withRouter 是一个修饰器，
   也可以在页尾 export default withRouter(TestCom) 将组件传入
*/
@withRouter
export default class TestCom extends Component {
   constructor(props) {
      super(props);
   }
   handleClick = () => {
      // withRouter 使组件获得了 location history match 三个属性
      this.props.history.push({
         pathname: '/home',
         search: '?name=testname'
      });
   };
   render() {
      return (
         <div className="test-container">
            <button onClick={this.handleClick}>点击回到 home page</button>
            <TestForm>
               <div>this is poatals</div>
            </TestForm>
         </div>
      );
   }
}
