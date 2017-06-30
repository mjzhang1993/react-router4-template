/*
	封装请求
*/
require('es6-promise').polyfill();
require('isomorphic-fetch');

// baseUrl 由 webpack 根据 环境变量 更换
export const host = baseUrl; // 当前服务器地址
console.log(baseUrl);

// 封装fetch 代替 ajax 请求数据
export default function request(method, url, body) {
	method = method.toUpperCase();
	if (method === 'GET') {
		body = undefined;
	} else {
		body = body && JSON.stringify(body);
	}

	return fetch(host + url, {
		method,
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body
	}).then((res) => {
		return res.json();
	});
}

export const get = url => request('GET', url);
export const post = (url, body) => request('POST', url, body);
export const put = (url, body) => request('PUT', url, body);
export const del = (url, body) => request('DELETE', url, body);
