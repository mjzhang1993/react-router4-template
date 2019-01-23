/*
   成员组
*/
import React from 'react';
import MemberItems from './MemberItems';

/*
   纯展示型组件可以使用函数式组件，传入的第一个参数是 props ，在这里不能访问 this
*/
const MemberList = ({ memberList }) => (
   <div className="member-list-wrap">
      <ul className="member-list">
         <MemberItems memberList={memberList} />
      </ul>
   </div>
);

export default MemberList;
