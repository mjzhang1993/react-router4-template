# react16-router4-template

### 版本

* master 分支与 v3.0.0 tag 是 webpack 5.x + redux + immer + Typescript 的版本
* webpack-v3-template 分支与 v1.0.0 tag 是 webpack 3.x 的版本
* webpack-v4-template 分支与 v2.0.0 tag 是 webpack 4.x 的版本
* enhance-redux redux 状态管理升级版本
* *最新的构建改为了使用 mobx, 源码参考地址 https://github.com/mjzhang1993/react-mobx-template/tree/master*

## 重要文件版本

> 更多版本信息查看 package.json 文件


## 命令

#### 0. 安装

```bash
   yarn install
```

#### 1. 打包 DLL 文件

```bash
   yarn build:dll
```

#### 1. 运行开发环境

```bash
   yarn start
```

#### 2. 输出生产环境文件

```bash
   yarn run build
```

#### 3. 输出生产环境，并查看模块分配

```bash
    yarn run build -- -r
```

#### 5. 安装 yarn

> yarn 是用来代替 npm 的 node 包管理工具, 与 npm 有类似的命令，具体安装方式及使用方法查看 [yarn 命令使用](http://blog.csdn.net/mjzhang1993/article/details/70092902)

## 项目相关文章

* [React - Webpack 开发环境重新搭建](http://blog.csdn.net/mjzhang1993/article/details/79013430)
* [重新搭建 React - Redux - Router 完整项目](http://blog.csdn.net/mjzhang1993/article/details/79022633)
* [React-router-v4 - Webpack 实现按需加载（code-splitting）](http://blog.csdn.net/mjzhang1993/article/details/79094594)
* [使用 Immer 代替 immutable 在 react 项目中实现不可变数据](https://blog.csdn.net/mjzhang1993/article/details/117084495)

## 目录结构说明

```bash
   .
├── README.md
├── babel.config.js
├── build                              # 构建结果
├── dll                                # 生成的 dll
├── lint-staged.config.js
├── report                             # 打包结果
├── scripts                            # 构建相关脚本
│   ├── build.js
│   ├── config
│   ├── dll-version-check.js
│   ├── dll.js
│   ├── start.js
│   └── utils
├── src
│   ├── bootstrap.tsx            # 启动文件
│   ├── index.html
│   ├── index.tsx                # 入口文件
│   └── store                    # store 相关封装
│       ├── StoreNames.ts
│       ├── createSlice.ts
│       ├── createStore.ts
│       ├── index.ts             # store 对接入口
│       └── initImmer.ts
│   ├── modules                  # 业务模块
│   │   ├── remote
│   │   └── root
│   ├── components # 抽象的组件
│   │   └── DynamicSystem
├── tsconfig.json
├── tsconfig.prod.json
├── typings
└── yarn.lock
```


