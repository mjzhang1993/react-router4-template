/*
* 假设 Home 模块是一个被多处使用的模块
* 它的 store 是在被使用时定义的
* */

// 创建一个组件生成函数

import store from '../../ReduxStore';
import createHomeActionTypes from './constants/HomeActionTypes';
import ComputeHomeContainer from './view/HomeContainer';
import HomeActions from './HomeActions';
import HomeReducer from './HomeReducer';

function generateHomeModule (storeName) {
  // 1
  const HomeActionTypes = createHomeActionTypes(storeName);

  // 2.
  const homeActions = new HomeActions(HomeActionTypes);

  // 3.
  const homeReducer = new HomeReducer(HomeActionTypes);

  console.log(store.getState())
  // 4. 向当前运行 store 中插入一个 reducer
  store.injectReducer(storeName, homeReducer, 'test.TestReducer');


  // 3. 创建组件
  return ComputeHomeContainer(storeName, homeActions);
}

export default generateHomeModule('home')
