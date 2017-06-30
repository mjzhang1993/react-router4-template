/*
   总的action，包括登录和退出登录
*/

import {
   CHANGE_INPUT_INFO,
   GET_MEMBER_LIST
} from '../constants.js';
import {post, get} from '../utils/request';

// 获取 成员信息列表
export function getMemberList() {
   return dispatch => {
      get('/list').then(resp => {
         dispatch({
            type: GET_MEMBER_LIST,
            msg: resp
         })
      }).catch(err => {
         console.log(err);
      })
   }
}

// 改变新增的本地的成员信息
export function changeInputInfo(newInfo) {
   return {type: CHANGE_INPUT_INFO, msg: newInfo};
}

// 提交新成员信息
export function postNewInfo(newInfo) {
   console.log('newInfo', newInfo);
   return dispatch => {
      post('/list', newInfo).then(() => {
         // 此处受json-server 限制 post会返回发送出去的数据 使用 get再获取一遍
         return get('/list');
      }).then(res => {
         console.log('res', res);
         dispatch({
            type: GET_MEMBER_LIST,
            msg: res
         })
      }).catch(err => {
         console.log(err);
      })
   }
}
