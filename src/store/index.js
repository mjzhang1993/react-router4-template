/*
   创建唯一 store 状态树
*/
import configureStore from './configureStore';
import reducer from '../modules/reducers';

// 给增强后的 createStore 函数传入 reducer，生成唯一的 store 状态树
const store = configureStore(reducer);

export default store;
