import './store/initImmer';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import RootContainer from './modules/root/routes';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <React.Suspense fallback={<div>loading...</div>}>
      <HashRouter>
        <RootContainer />
      </HashRouter>
    </React.Suspense>
  </Provider>,
  document.getElementById('root'),
);
