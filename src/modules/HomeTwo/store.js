// @flow

/*
* 模块单独的 store
* */
import {generateStore} from '../../ReduxStoreGenerator';
import homeTwo from './HomeReducer'

const store = generateStore({
  homeTwo
}, [], {name: 'homeTwo'});

export default store;
