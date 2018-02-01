/*
   Home 容器组件的子组件，信息展示
*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NewMember from './NewMember';
import MemberList from './MemberList';

import '../../scss/home.scss';

export default class HomeCom extends Component {
   constructor(props) {
      super(props);
   }
   componentWillMount() {
      this.props.getMemberList();
   }
   render() {
      const { homeState, changeInputInfo, postNewInfo } = this.props;
      const { memberList, inputInfo } = homeState;

      return (
         <div id="home-container">
            <NewMember inputInfo={inputInfo} changeInputInfo={changeInputInfo} postNewInfo={postNewInfo} />
            <MemberList memberList={memberList} />
            {/* location 对象可以有 search 但是 query 取消了 */}
            <Link to={{ pathname: '/test', search: '?name=homename', state: { mold: 'add' } }} className="home-link">
               点击跳转到 test page sasas
            </Link>
         </div>
      );
   }
}
