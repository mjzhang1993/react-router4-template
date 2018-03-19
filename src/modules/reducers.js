// 引入reducer
import { combineReducers } from 'redux';
import home from './home/reducer';

// 合并到主reducer
const reducers = {
   home
};

// combineReducers() 函数用于将分离的 reducer 合并为一个 reducer
export default combineReducers(reducers);
