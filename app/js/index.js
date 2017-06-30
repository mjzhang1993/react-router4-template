/*
   app/js/index.js
   入口文件, 配置 webpack 热加载模块
*/
import '../scss/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';

// 引入原始的配置模块
import Root from './routes.js';

const mountNode = document.getElementById('app');

// react 的插件，提供onTouchTap()
injectTapEventPlugin();

// 封装 render
const render = (Component) => {
	ReactDOM.render((
		<AppContainer>
			<Component/>
		</AppContainer>
	), mountNode);
};

render(Root);
console.log(process.env.NODE_ENV);

if (module.hot && process.env.NODE_ENV !== 'production') {
	module.hot.accept('./routes.js', (err) => {
		if (err) {
			console.log(err);
		}
		// 卸载 react 模块后 重装
		ReactDOM.unmountComponentAtNode(mountNode);
		render(Root);
	});
}
