/*
   root 的网络请求部分
*/
import {get, post} from './request';

export function obtainMemberList() {
   return get('/list').then(res => res.data);
}

export function postNewMember(newMember) {
   return post('/list', newMember).then(res => res.data);
}
