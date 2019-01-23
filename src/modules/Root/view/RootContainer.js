/*
   App 应用总容器
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import RootRootView from './RootRootView';

class RootContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <RootRootView {...this.props}>{this.props.children}</RootRootView>;
  }
}

export default connect(
  state => ({
    title: state.getIn(['root', 'subTitle']),
    errorStatus: state.getIn(['root', 'errorStatus'])
  })
)(RootContainer);
