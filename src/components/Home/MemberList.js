/*
   成员组
*/
// PureComponent 在 react 16版本中代替 'pure-render-decorator' 功能，减少 render
import React, {PureComponent} from 'react';
import MemberItems from './MemberItems';

export default class MemberList extends PureComponent {
   constructor(props) {
      super(props);
   }
   render() {
      const memberList = this.props.memberList;

      return (
         <div className="member-list-wrap">
            <ul className="member-list">
               <MemberItems memberList={memberList}/>
            </ul>
         </div>
      );
   }
}
