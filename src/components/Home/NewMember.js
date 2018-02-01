/*
   添加新成员
*/
import React, { PureComponent } from 'react';

export default class NewMember extends PureComponent {
   constructor(props) {
      super(props);
   }
   handleChange(mold, e) {
      const { changeInputInfo, inputInfo } = this.props;
      const newInfo = { ...inputInfo };

      newInfo[mold] = e.target.value;

      changeInputInfo(newInfo);
   }
   handleClick = () => {
      const { postNewInfo, inputInfo } = this.props;

      postNewInfo(inputInfo)
         .then(res => console.log('success return ', res))
         .catch(err => console.error(err));
   };
   render() {
      const { name, tel } = this.props.inputInfo;

      return (
         <div className="new-member">
            <p>
               姓名：
               <input type="text" value={name} onChange={this.handleChange.bind(this, 'name')} />
            </p>
            <p>
               电话：
               <input type="tel" value={tel} onChange={this.handleChange.bind(this, 'tel')} />
            </p>
            <button onClick={this.handleClick}>提交</button>
         </div>
      );
   }
}
