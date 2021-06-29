/**
 * 模块 store 创建
 * */

import { createStore, beforeMountStore } from './createStore';
import STORE_NAMES from './StoreNames';
import remoteSlice from '../modules/remote/remoteSlice';

const store = createStore({
  reducer: {
    [STORE_NAMES.REMOTE]: remoteSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const { mountStoreToSlice } = beforeMountStore(store);

export const actions = {
  [STORE_NAMES.REMOTE]: mountStoreToSlice(remoteSlice.sliceInstance),
};

export { mountStoreToSlice, STORE_NAMES };

export default store;
