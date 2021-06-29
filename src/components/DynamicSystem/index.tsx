/**
 * 模块联邦 异步加载远程应用
 * */

// 远程应用装载
function loadComponent(scope: string, module: string) {
  return async () => {
    // 1. 初始化共享作用域
    await __webpack_init_sharing__('default');
    // 3. 拿到远程应用的容器（如果加载了一个 remote 的 remoteEntry.js 那么 remoteEntry.j 中会在 window 下注册容器）
    const container = window[scope];
    // 4. 初始化远程应用容器
    await container.init(__webpack_share_scopes__.default);
    // 5. 拿到远程应用容器中的模块
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  };
}

// 一个添加 remoteEntry.js 的自定义 HOOK
function useDynamicRemoteEntry(remoteUrl: string) {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (!remoteUrl) return undefined;

    const element = document.createElement('script');

    element.src = remoteUrl;
    element.type = 'text/javascript';
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = () => {
      setReady(true);
    };

    element.onerror = () => {
      console.error(`Dynamic Script Error: ${remoteUrl}`);
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      document.head.removeChild(element);
    };
  }, [remoteUrl]);

  return {
    ready,
    failed,
  };
}

// 动态远程应用的渲染封装
interface DynamicRemoteProps {
  remoteUrl: string;
  scope: string;
  module: string;
  [key: string]: any;
}
const DynamicSystem: React.FC<DynamicRemoteProps> = (props: DynamicRemoteProps) => {
  const { remoteUrl, module, scope, ...otherProps } = props;
  const { ready, failed } = useDynamicRemoteEntry(remoteUrl);
  if (!remoteUrl || !module || !scope) return null;

  if (!ready) {
    return <h2>Loading dynamic script: {remoteUrl}</h2>;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {remoteUrl}</h2>;
  }

  const Component = React.lazy(loadComponent(scope, module));

  return (
    <React.Suspense fallback="Loading System ...">
      <Component {...otherProps} />
    </React.Suspense>
  );
};

export default DynamicSystem;
