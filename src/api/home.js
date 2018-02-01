/*
   home 的网络请求部分
*/
import { get, post } from './request';

export function obtainMemberList() {
   return get('/list').then(res => res.data);
}

export function postNewMember(newMember) {
   if (!newMember.name) {
      return Promise.reject('name is wrong');
   }
   return post('/list', newMember).then(res => res.data);
}
