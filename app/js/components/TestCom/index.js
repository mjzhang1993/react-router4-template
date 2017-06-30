/*
   Test 容器组件的子组件，信息展示
*/
import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

import '../../../scss/home.scss';

class TestCom extends Component {
   constructor(props) {
      super(props);
   }
   handleClick = () => {
      // withRouter 使组件获得了 location history match 三个属性
      this.props.history.push({
         pathname: '/home',
         search: '?name=testname'
      });
   }
   render() {
      console.log(this.props);

      return (
         <div className="test-container">
            this is Test Page
            <button onClick={this.handleClick}>点击回到 home page</button>
         </div>
      );
   }
}


export default withRouter(TestCom);
