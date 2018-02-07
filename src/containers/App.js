/*
   App 应用总容器
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppCom from '../components/App/index';

class App extends Component {
   constructor(props) {
      super(props);
   }
   render() {
      return <AppCom title={this.props.title}>{this.props.children}</AppCom>;
   }
}

export default connect(state => ({ title: state.home.title }))(App);
