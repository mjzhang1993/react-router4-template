import { createSlice, PayloadAction, Store } from '@reduxjs/toolkit';

type TUpdateFn<State> = (state: Immer.Draft<State>) => void;

// eslint-disable-next-line @typescript-eslint/ban-types
abstract class BaseSlice<State extends {} = {}> {
  public store: Store;
  abstract storeName: string;
  public initialState: State;
  public updateStore: (updateFn: Partial<State> | TUpdateFn<State>) => void;
  public resetStore: () => void;

  constructor(initialState: State) {
    this.initialState = initialState;
  }

  public get state() {
    return this.store.getState();
  }

  public get currentState() {
    const state = this.state;
    return state[this.storeName];
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
function createSubSlice<SI extends BaseSlice, IState extends {}>(sliceInstance: SI) {
  const { storeName, initialState } = sliceInstance;

  const slice = createSlice({
    name: storeName,
    initialState: initialState as IState,
    reducers: {
      updateStore: (
        state: Immer.Draft<IState>,
        action: PayloadAction<{ updateFn: TUpdateFn<IState> }>,
      ) => {
        return action.payload.updateFn(state);
      },
      resetStore: (state: Immer.Draft<IState>) => {
        Object.keys(initialState).forEach((key: string) => {
          state[key] = initialState[key];
        });
      },
    },
  });

  const { updateStore, resetStore } = slice.actions;

  sliceInstance.updateStore = function (param: Partial<IState> | TUpdateFn<IState>) {
    if (typeof param === 'function') {
      this.store.dispatch(updateStore({ updateFn: param }));
    } else {
      this.store.dispatch(
        updateStore({
          updateFn: (state) => {
            Object.keys(param).forEach((key: string) => {
              state[key] = param[key];
            });
          },
        }),
      );
    }
  };

  sliceInstance.resetStore = function () {
    this.store.dispatch(resetStore());
  };

  return {
    reducer: slice.reducer,
    sliceInstance,
  };
}

export { BaseSlice, createSubSlice };
