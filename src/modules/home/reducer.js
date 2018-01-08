/*
   整体的通用的状态
*/
import {
   CHANGE_INPUT_INFO,
   GET_MEMBER_LIST
} from '../types-constant';

// 初始化数据
const initialState = {
   memberList: [],
   inputInfo: {
      name: '',
      tel: ''
   }
};

// 不同 action type 的处理函数
const typesCommands = {
   [CHANGE_INPUT_INFO](state, action) {
      return Object.assign({}, state, { inputInfo: action.msg });
   },
   [GET_MEMBER_LIST](state, action) {
      return Object.assign({}, state, { memberList: action.msg });
   }
}

export default function home(state = initialState, action) {
   const actionResponse = typesCommands[action.type];

   return actionResponse ? actionResponse(state, action) : state;
}
