/*
   创建唯一 store 状态树
*/
import configureStore from './configureStore';
import reducer from '../modules/reducers';

// 给增强后的 createStore 函数传入 reducer，生成唯一的 store 状态树
const store = configureStore(reducer);

/*
   2018-02-07 更新
   由于单独使用 react-hot-loader 不会更新 reducer 
   此处需要通过 webpack 提供的接口根据文件变化更新 reducer
   store.replaceReducer() 是 redux 提供接口，用于更换当前的 reducer 

   注意：同样不会触发更新的还有 react 组件中的 ‘this.state’ 
      手动修改 state 中数据不会触发视图更新
*/

if (module.hot) {
   module.hot.accept('../modules/reducers.js', () => {
      console.log('reducer changed');
      store.replaceReducer(require('../modules/reducers').default);
   });
}

export default store;
