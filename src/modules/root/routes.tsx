import { Route, Switch, Redirect, Link } from 'react-router-dom';
import { Button } from 'antd';
import './styles/root.scss';
import Remote from '../remote';

const RouteEntry: React.FC = () => {
  const [state, setState] = React.useState({
    title: '',
    age: 0,
  });

  const reset = () => {
    setState(
      immer.produce((draft: Immer.Draft<typeof state>) => {
        draft.title = 'new title';
      }),
    );
  };
  console.log(state);
  return (
    <Switch>
      <Route exact path="/login" render={() => <Redirect to="/" />} />
      <Route exact path="/remote" component={Remote} />
      <Route
        exact
        path="/"
        render={() => (
          <div className="root-login">
            <Button onClick={reset}>click me</Button>
            <Link to="/remote">/remote</Link>
          </div>
        )}
      />
    </Switch>
  );
};

export default RouteEntry;
