/*
   1. home 容器的 createAction 函数
	2. action 是一个描述我们想要改变什么的对象，
	他需要有一个 属性为 type 值为 字符串 的键值对，对应着 reducer 中生成新 state 状态的规则
	3. dispatch 函数仅可以通过 store.dispatch() 调用，
	如下 createAction 中的 dispatch 是传入的参数，为了配合 redux bindActionCreators() 函数使用
*/

// 将 action.type 抽取为常量，减少出错
import { CHANGE_INPUT_INFO, GET_MEMBER_LIST } from '../types-constant';
// 将网络请求抽取出来，方便接口调试，函数返回 Promise
import { obtainMemberList, postNewMember } from '../../api/home';

// 获取 成员信息列表
export function getMemberList() {
   return dispatch => {
      obtainMemberList()
         .then(res => dispatch({ type: GET_MEMBER_LIST, msg: res }))
         .catch(err => console.log('error ', err));
   };
}

// 改变新增的本地的成员信息
export function changeInputInfo(newMember) {
   return { type: CHANGE_INPUT_INFO, msg: newMember };
}

// 提交新成员信息
export function postNewInfo(newMember) {
   console.log('newMember', newMember);
   return async dispatch => {
      await postNewMember(newMember);
      const newData = await obtainMemberList();

      dispatch({ type: GET_MEMBER_LIST, msg: newData });

      return 'success';
   };
}
