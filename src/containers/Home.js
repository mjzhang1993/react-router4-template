/*
   Home 主页
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HomeCom from '../components/Home/index';
import { getMemberList, changeInputInfo, postNewInfo } from '../modules/home/actions';

class Home extends Component {
   constructor(props) {
      super(props);
   }
   render() {
      return <HomeCom {...this.props} />;
   }
}

/*
	1. connect 是一个高阶函数，调用后会返回一个函数
	2. 再次传入一个组件作为参数调用后，会返回一个新的包装过的组件
	3. connect 的作用是链接组件与 Redux store，前提是这个组件外层有 Provider 组件包裹
	4. connect 首次调用接受两个可选参数，
		(1). mapStateToProps 函数，接收 store 中 state 作为参数，
			返回的状态作为属性注入到组件中
		(2). mapDispatchToProps 函数，接收 store.dispatch 作为参数，
			返回一个对应 actionCreator 的对象
	5. bindActionCreators 方法由 Redux 提供，
		用来把 action creators 转成拥有同名 keys 的对象，但使用 dispatch 把每个 action creator 包围起来，这样可以直接调用它们
*/

export default connect(
   state => ({ homeState: state.home }),
   dispatch => ({
      getMemberList: bindActionCreators(getMemberList, dispatch),
      changeInputInfo: bindActionCreators(changeInputInfo, dispatch),
      postNewInfo: bindActionCreators(postNewInfo, dispatch)
   })
)(Home);
