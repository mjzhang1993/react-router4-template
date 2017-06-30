/*
   公用配置
*/
const path = require('path');

exports.sassLoaderSuffix = '?outputStyle=expanded&sourceMap=true&sourceMapContents=true&includePaths[]=./node_modules';
exports.sassLoaderProd = '?outputStyle=expanded';

exports.vendor = [
	'react',
	'react-dom',
	'react-redux',
	'react-router',
	'react-router-redux',
	'react-tap-event-plugin',
	'redux',
	'redux-thunk',
	'isomorphic-fetch',
	'es6-promise',
	'pure-render-decorator',
	'react-addons-css-transition-group'
];

exports.autoConfig = {
	browsers: [
		'ie >= 9',
		'ie_mob >= 10',
		'ff >= 30',
		'chrome >= 34',
		'safari >= 7',
		'opera >= 23',
		'ios >= 7',
		'android >= 4.4',
		'bb >= 10'
	],
	cascade: true,
	remove: true
};

exports.uglifyJsConfig = {
	beautify: false,
	compress: {
		warnings: false,
		drop_debugger: true,
		drop_console: true
	},
	mangle: {
		except: ['$super', '$', 'exports', 'require']
	},
	space_colon: false,
	comments: false
};

const ROOT_PATH = path.resolve(__dirname, '../');
exports.defPath = {
	ROOT_PATH: ROOT_PATH,
	APP_PATH: path.resolve(ROOT_PATH, 'app'),
	DEV_PATH: path.resolve(ROOT_PATH, 'dev'),
	BUILD_PATH: path.resolve(ROOT_PATH, 'build'),
	TPL_PATH: path.resolve(ROOT_PATH, 'app/tpl.html'),
	ENTRY_PATH:	path.resolve(ROOT_PATH, 'app/js/index.js'),
	ESLINT_PATH: path.resolve(ROOT_PATH, './.eslintrc'),
	REQUEST_PATH: path.resolve(ROOT_PATH, 'app/js/utils/request')
}
