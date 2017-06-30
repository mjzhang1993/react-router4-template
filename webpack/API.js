/*
   服务器 API 配置文件
*/
const ip = require('ip').address();

module.exports = {
	test: 'http://xxx.xxx.xxx', // 测试环境的服务器地址
	development: 'http://' + ip + ':3003', // 开发环境的本地服务器地址
	production: 'http://xxx.xxx.xxx' // 生产环境的服务器地址
};
