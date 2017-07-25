/*
   app/js/index.js
   入口文件, 配置 webpack 热加载模块
*/
import '../scss/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import createHistory from 'history/createBrowserHistory';

// 引入原始的配置模块
import store from './store/index';
import Root from './routes';

const history = createHistory();
const mountNode = document.getElementById('app');

// react 的插件，提供onTouchTap()
injectTapEventPlugin();

// 封装 render
const render = (Component) => {
	ReactDOM.render((
		<AppContainer>
			<Provider store={store}>
				<ConnectedRouter history={history} basename="">
					<Component/>
				</ConnectedRouter>
			</Provider>
		</AppContainer>
	), mountNode);
};

render(Root);
console.log(process.env.NODE_ENV);

if (module.hot && process.env.NODE_ENV !== 'production') {
	module.hot.accept('./routes.js', (err) => {
		console.log('module hot');
		if (err) {
			console.log(err);
		}
		const NextComponent = require('./routes.js').default; // eslint-disable-line

		render(NextComponent);
	});
}
