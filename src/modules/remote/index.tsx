import { Button, Form, Input } from 'antd';
import { connect } from 'react-redux';
import { actions, RootState, STORE_NAMES } from 'store';
import Cache from './Cache';
import Content from './Content';
// import DynamicSystem from '../../components/DynamicSystem';

const remoteActions = actions[STORE_NAMES.REMOTE];

interface Props {
  remoteStore: RootState[STORE_NAMES.REMOTE];
}

class DynamicRemote extends React.Component<Props> {
  componentDidMount() {
    remoteActions.getData();
  }

  onFinish = (values: RootState[STORE_NAMES.REMOTE]['remote']['data']) => {
    remoteActions.updateStore((state) => {
      state.remote.data = values;
    });
  };

  cacheTo = () => {
    remoteActions.updateStore((state) => {
      state.remote.cache.push(state.remote.data);
    });
  };

  increase = () => {
    remoteActions.increase();
  };

  render(): React.ReactNode {
    const { remoteStore } = this.props;
    const { remote, count } = remoteStore;
    const { cache, data } = remote;

    console.log('render remote');
    return (
      <div>
        <Button onClick={this.cacheTo}> click to Cache</Button>
        <Button onClick={this.increase}> click to increase</Button>
        <Button onClick={() => remoteActions.resetStore()}> click to clear</Button>
        <p>count: {count}</p>
        <Content content={data} />
        <Cache cache={cache} />
        <Form onFinish={this.onFinish}>
          <Form.Item label="remoteUrl" name="remoteUrl">
            <Input />
          </Form.Item>
          <Form.Item label="scope" name="scope">
            <Input />
          </Form.Item>
          <Form.Item label="module" name="module">
            <Input />
          </Form.Item>
          <Form.Item label="module" name="module">
            <Button type="primary" htmlType="submit">
              Get Dynamic Remote App
            </Button>
          </Form.Item>
        </Form>
        <div style={{ width: '100%', height: 'auto', border: '1px solid red' }}>
          {/* <DynamicSystem */}
          {/*  module={module} */}
          {/*  remoteUrl={remoteUrl} */}
          {/*  scope={scope} */}
          {/*  store={{ counter: 0 }} */}
          {/* /> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    remoteStore: state.remote,
  };
};

export default connect(mapStateToProps)(DynamicRemote);
