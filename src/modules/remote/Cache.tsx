interface Props {
  cache: {
    remoteUrl: string;
    scope: string;
    module: string;
  }[];
}

class Cache extends React.PureComponent<Props> {
  render(): React.ReactNode {
    const { cache } = this.props;
    console.log('render cache');

    return (
      <div>
        {cache.map((c) => {
          return (
            <div key={c.remoteUrl}>
              <p>CACHE scope: {c.scope}</p>
              <p>CACHE remoteUrl: {c.remoteUrl}</p>
              <p>CACHE module: {c.module}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Cache;
