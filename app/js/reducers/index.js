// 引入reducer
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import rootReducer from './rootReduer';

// 合并到主reducer
const reducer = combineReducers({
	rootReducer,
	routing: routerReducer
});

export default reducer;
