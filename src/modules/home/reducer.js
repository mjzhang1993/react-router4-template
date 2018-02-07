/*
   home 容器的状态管理
*/

// 将 action type 提取出来作为常量，防止编写错误
import { CHANGE_INPUT_INFO, GET_MEMBER_LIST } from '../types-constant';

// state 初始化数据
const initialState = {
   memberList: [],
   inputInfo: {
      name: '',
      tel: ''
   },
   title: '成员列表'
};

/*
   对应不同 action.type 的处理函数，需要返回一个新的 state
   也可以 switch 语句 处理不同 action.type
*/
const typesCommands = {
   [CHANGE_INPUT_INFO](state, action) {
      return Object.assign({}, state, { inputInfo: action.msg });
   },
   [GET_MEMBER_LIST](state, action) {
      return Object.assign({}, state, { memberList: action.msg });
   }
};

/*
   这里会输出一个 reducer 函数，
   reducer 函数的作用是，根据当前的状态去返回一个新的状态
   state 参数是不可变的，这里返回的 state 一定是一个新的状态
*/
export default function home(state = initialState, action) {
   const actionResponse = typesCommands[action.type];

   return actionResponse ? actionResponse(state, action) : state;
}
