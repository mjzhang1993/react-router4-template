// 引入reducer
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import root from './root/reducer';

// 合并到主reducer
const reducers = {
   root,
   routing: routerReducer
};

export default combineReducers(reducers);
