/*
   添加新成员
*/
import React, {Component} from 'react';
import pureRender from 'pure-render-decorator';

class NewMember extends Component {
   constructor(props) {
      super(props);
   }
   handleChange(mold, e) {
      const {changeInputInfo, inputInfo} = this.props;
      const newInfo = {...inputInfo};

      newInfo[mold] = e.target.value;

      changeInputInfo(newInfo);
   }
   handleClick = () => {
      const {postNewInfo, inputInfo} = this.props;

      postNewInfo(inputInfo);
   }
   render() {
      const {name, tel} = this.props.inputInfo;

      return (
         <div className="new-member">
            <p>
               姓名：<input type="text" value={name} onChange={(e) => this.handleChange('name', e)}/>
            </p>
            <p>
               电话：<input type="tel" value={tel} onChange={(e) => this.handleChange('tel', e)}/>
            </p>
            <button onClick={this.handleClick}>提交</button>
         </div>
      );
   }
}

export default pureRender(NewMember);
