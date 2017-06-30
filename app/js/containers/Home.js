/*
   Home 主页
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import HomeCom from '../components/HomeCom/index';
import {getMemberList, changeInputInfo, postNewInfo} from '../actions/rootAct';

class Home extends Component {
   constructor(props) {
      super(props);
   }
   render() {
      const {rootState, getMemberList, changeInputInfo, postNewInfo} = this.props;

      return (
         <HomeCom
            rootState={rootState}
            getMemberList={getMemberList}
            changeInputInfo={changeInputInfo}
            postNewInfo={postNewInfo}
         />
      );
   }
}

export default connect(
   state => ({rootState: state.rootReducer}),
   dispatch => ({
      getMemberList: bindActionCreators(getMemberList, dispatch),
      changeInputInfo: bindActionCreators(changeInputInfo, dispatch),
      postNewInfo: bindActionCreators(postNewInfo, dispatch)
   })
)(Home);
