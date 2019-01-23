/*
   成员组中成员列表,
   这里主要测验 react 16 开始，render 可以返回一个数组
   开发时，尽量将重复使用组件抽取出来
*/
// PureComponent 在 react 16版本中代替 'pure-render-decorator' 功能，减少 render
import React, { PureComponent } from 'react';

export default class MemberItems extends PureComponent {
   constructor(props) {
      super(props);
   }
   render() {
      const memberList = this.props.memberList;

      return memberList.map((item, i) => {
         return (
            <li key={i}>
               <p>
                  name:<span>{item.name}</span>
               </p>
               <p>
                  tel:<span>{item.tel}</span>
               </p>
            </li>
         );
      });
   }
}
