/*
   action
*/
import {CHANGE_INPUT_INFO, GET_MEMBER_LIST} from '../types-constant';
import {obtainMemberList, postNewMember} from '../../api/root';

// 获取 成员信息列表
export function getMemberList() {
	return dispatch => {
		obtainMemberList()
			.then(res => dispatch({type: GET_MEMBER_LIST, msg: res}))
			.catch(err => console.log('error ', err));
	}
}

// 改变新增的本地的成员信息
export function changeInputInfo(newMember) {
	return {type: CHANGE_INPUT_INFO, msg: newMember};
}

// 提交新成员信息
export function postNewInfo(newMember) {
	console.log('newMember', newMember);
	return async dispatch => {
		await postNewMember(newMember)
		try {
			const newData = await obtainMemberList();

			dispatch({type: GET_MEMBER_LIST, msg: newData});
		} catch (err) {
			console.log(err);
		}
	}
}
