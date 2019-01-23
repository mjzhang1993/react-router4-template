/*
   Home 主页
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeRootView from './HomeRootView';
import HomeActions from '../HomeActions';

class HomeContainer extends Component {
  constructor(props) {
    super(props);
  }

  get Actions() {
    return HomeActions;
  }

  render() {
    console.log(this.props)
    return <HomeRootView
      {...this.props}
      Actions={this.Actions}
    />;
  }
}

export default connect(
  state => ({ homeState: state.getIn(['homeTwo']) })
)(HomeContainer);

