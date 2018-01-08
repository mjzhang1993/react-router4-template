// 引入reducer
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import home from './home/reducer';

// 合并到主reducer
const reducers = {
   home,
   routing: routerReducer
};

export default combineReducers(reducers);
