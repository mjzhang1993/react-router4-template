/**
 * Slice 结合了 action 与 reduce 的能力
 * */
import { STORE_NAMES } from 'store';
import { BaseSlice, createSubSlice } from '../../store/createSlice';

interface InitialState {
  count: number;
  remote: {
    data: { remoteUrl: string; scope: string; module: string };
    cache: { remoteUrl: string; scope: string; module: string }[];
  };
}

class HomeSlice extends BaseSlice<InitialState> {
  storeName = STORE_NAMES.REMOTE;
  constructor() {
    // 通过 super() 传入初始数据
    super({
      count: 0,
      remote: {
        data: { remoteUrl: '', scope: '', module: '' },
        cache: [],
      },
    });
  }

  increase() {
    console.log(this.store);
    console.log(this.currentState);
    console.log(this.state);
    // Slice 内通过 this.updateStore() 来更新 state
    this.updateStore((state) => {
      // updateStore 参数函数内，实际就是 Immer 的 produce，
      // 在这里可以直接操作数据，而不用结构，Immer 会帮助生成新的不可变数据
      state.count += 1;
    });

    // Slice 内通过 this.resetStore() 来重置 state
  }

  getData() {
    return new Promise((resolve) => {
      setTimeout(
        () => resolve({ remoteUrl: 'default', scope: 'default', module: 'default' }),
        3000,
      );
    }).then((cache: InitialState['remote']['data']) => {
      this.updateStore((state) => {
        state.remote.cache.push(cache);
      });
    });
  }
}

export default createSubSlice<HomeSlice, InitialState>(new HomeSlice());
