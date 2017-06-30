const path = require('path');
// const DB = require('./db.json');
const jsonServer = require('json-server');
// 获取本机ip
const ip = require('ip').address();
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.use(router);
server.listen({
	host: ip,
	port: 3003
}, function() {
	console.log(`JSON Server is running in http://${ip}:3003`);
});
