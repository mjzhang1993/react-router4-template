import * as lodash from 'lodash';
import * as OriginImmer from 'immer';
import { Draft as ODraft, Immutable as OImmutable } from 'immer';

// React 已经是全局模块了不需要再引入
declare global {
  type _ = typeof lodash;
  const immer: typeof OriginImmer;
  const __webpack_init_sharing__: any;
  const __webpack_share_scopes__: any;
  const RUNTIME_NODE_ENV: string;

  interface Window {
    __webpack_init_sharing__: any;
    __webpack_share_scopes__: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
  }

  interface Navigator {
    userLanguage: string;
  }

  namespace Immer {
    export type Draft<T> = ODraft<T>;
    export type Immutable<T> = OImmutable<T>;
  }
}
