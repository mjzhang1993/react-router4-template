/*
   绑定 action 到组件上，用于简化 redux bindActionCreators使用
*/
import {bindActionCreators} from 'redux';

export default function bindActions(dispatch, actionMap) {
   let bindedActions = {};

   Object.keys(actionMap).forEach(action => {
      bindedActions[action] = bindActionCreators(actionMap[action], dispatch);
   })

   return bindedActions;
}
