/*
   Home 主页
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import bindActions from '../utils/bindActions';

import HomeCom from '../components/Home/index';
import {getMemberList, changeInputInfo, postNewInfo} from '../modules/root/actions';

class Home extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (<HomeCom {...this.props}/>);
	}
}

export default connect(
   state => ({rootState: state.root}),
   dispatch => (bindActions(dispatch, {
      getMemberList, changeInputInfo, postNewInfo
   }))
)(Home);
