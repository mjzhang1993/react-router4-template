// @flow

/*
* 假设 Home 模块是一个被多处使用的模块
* 它的 store 是在被使用时定义的
* */

// 创建一个组件生成函数

import { Provider } from 'react-redux';
import store from './store';
import HomeContainer from './view/HomeContainer';

type Props = {

}

class HomeProvider extends React.Component<Props> {
  store: any;
  constructor(props: Props) {
    super(props);
    this.store = store;
  }

  render(): React.Element<any> {
    return (
      <Provider store={this.store}>
        <HomeContainer/>
      </Provider>
    )
  }
}

export default HomeProvider;
