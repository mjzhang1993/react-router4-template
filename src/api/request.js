/*
   API 接口配置
   axios 参考文档：https://www.kancloud.cn/yunye/axios/234845
   注意：basicRequestLink 在 /config/index.js 中配置，由 imports-loader 注入
*/
import axios from 'axios';

/* eslint-disable no-undef */
const basicHost = basicRequestLink;
console.log(basicHost);

// 删除底部 '/'
function deleteSlash(host) {
   return host.replace(/\/$/, '');
}

// 添加头部 '/'
function addSlash(path) {
   return /^\//.test(path) ? path : `/${path}`;
}

// 解析参数
function separateParams(url) {
   const [path = '', paramsLine = ''] = url.split('?');

   let params = {};

   paramsLine.split('&').forEach(item => {
      const [key, value] = item.split('=');

      params[key] = value;
   });

   return { path, params };
}

// 主要请求方法
export default function request(config) {
   let { method, url, data = {}, host, headers } = config;

   method = (method && method.toUpperCase()) || 'GET';

   const { path, params } = separateParams(url);

   url = host ? `${deleteSlash(host)}${addSlash(path)}` : `${deleteSlash(basicHost)}${addSlash(path)}`;

   return axios({
      url,
      method,
      headers,
      data: method === 'GET' ? undefined : data,
      params: Object.assign(method === 'GET' ? data : {}, params)
   }).catch(err => {
      // 请求出错
      console.log('request error, HTTP CODE: ', err.response.status);

      return Promise.reject(err);
   });
}

// 一些常用的请求方法
export const get = (url, data) => request({ url, data });
export const post = (url, data) => request({ method: 'POST', url, data });
export const put = (url, data) => request({ method: 'PUT', url, data });
export const del = (url, data) => request({ method: 'DELETE', url, data });
