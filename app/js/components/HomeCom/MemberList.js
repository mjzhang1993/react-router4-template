/*
   添加新成员
*/
import React, {Component} from 'react';
import pureRender from 'pure-render-decorator';

class MemberList extends Component {
   constructor(props) {
      super(props);
   }
   render() {
      const memberList = this.props.memberList;

      return (
         <div className="member-list-wrap">
            <ul className="member-list">
               {memberList.map((item, i) => {
                  return (
                     <li key={i}>
                        <p>name:<span>{item.name}</span></p>
                        <p>tel:<span>{item.tel}</span></p>
                     </li>
                  );
               })}
            </ul>
         </div>
      );
   }
}

export default pureRender(MemberList);
