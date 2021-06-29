interface Props {
  content: {
    remoteUrl: string;
    scope: string;
    module: string;
  };
}

class Content extends React.PureComponent<Props> {
  render(): React.ReactNode {
    const { content } = this.props;
    console.log('render content');

    return (
      <div>
        <p>CONTENT scope: {content.scope}</p>
        <p>CONTENT remoteUrl: {content.remoteUrl}</p>
        <p>CONTENT module: {content.module}</p>
      </div>
    );
  }
}

export default Content;
