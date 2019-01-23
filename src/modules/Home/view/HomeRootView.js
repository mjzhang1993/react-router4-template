/*
   Home 容器组件的子组件，信息展示
*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NewMember from './NewMember';
import MemberList from './MemberList';

import '../style/home.scss';

export default class HomeRootView extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.Actions.getMemberList();
  }
  render() {
    const { homeState, Actions } = this.props;
    const { memberList, inputInfo } = homeState ? homeState.toJS() : {memberList: [], inputInfo: {}};

    return (
      <div id="home-container">
        <NewMember inputInfo={inputInfo} Actions={Actions} />
        <MemberList memberList={memberList} />
        {/* location 对象可以有 search 但是 query 取消了 */}
        <Link to={{ pathname: '/test', search: '?name=homename', state: { mold: 'add' } }} className="home-link">
          点击跳转到 test page sasas
        </Link>
      </div>
    );
  }
}
