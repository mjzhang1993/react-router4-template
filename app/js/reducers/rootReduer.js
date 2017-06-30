/*
   整体的通用的状态
*/

const initialState = {
	memberList:[],
	inputInfo:{
		name: '',
		tel: ''
	}
};

export default function rootReducer(state = initialState, action) {
	switch (action.type) {
		case 'CHANGE_INPUT_INFO':
			return Object.assign({}, state, {inputInfo: action.msg});
		case 'GET_MEMBER_LIST':
			return Object.assign({}, state, {memberList: action.msg});
		default:
			return state;
	}
}
