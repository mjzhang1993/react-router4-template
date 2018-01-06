/*
   创建唯一 store 并输出
*/
import configureStore from './configureStore';
import reducer from '../modules/reducers';

// 给增强后的store传入reducer
const store = configureStore(reducer);

export default store;
