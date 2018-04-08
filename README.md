# react16-router4-template

### 两个版本

- master 分支与 v1.0.0 tag 是 webpack 3.x 的版本
- webpack-v4-template 分支与 v2.0.0 tag 是 webpack 4.x 的版本

### 重要更新

- 2018.04.08 : 更新 webpack 为 4.x 版本，整体进行版本升级

## 重要文件版本

> 更多版本信息查看 package.json 文件

* "react": "^16.3.1"
* "react-hot-loader": "^4.0.1"
* "react-redux": "^5.0.7"
* "react-router-dom": "^4.2.2"
* "redux": "^3.7.2"

* "babel-core": "^6.26.0",
* "babel-eslint": "^8.2.2",
* "babel-loader": "^7.1.4",
* "eslint": "^4.19.1",
* "postcss-loader": "^2.1.3",
* "webpack": "^4.5.0",
* "webpack-dev-server": "^3.1.2",
* "webpack-cli": "^2.0.14",

## 命令

#### 0. 安装

```bash
   sudo yarn install
```

#### 1. 运行开发环境

```bash
   yarn run dev # 或者 yarn start
```

#### 2. 输出生产环境文件

```bash
   yarn run build
```

#### 3. 输出生产环境，并查看模块分配

```bash
   yarn run report
```

#### 4. 运行本地开发服务器

```bash
   yarn run server
```

#### 5. 安装 yarn

> yarn 是用来代替 npm 的 node 包管理工具, 与 npm 有类似的命令，具体安装方式及使用方法查看 [yarn 命令使用](http://blog.csdn.net/mjzhang1993/article/details/70092902)

## 项目相关文章

* [React - Webpack 开发环境重新搭建](http://blog.csdn.net/mjzhang1993/article/details/79013430)
* [重新搭建 React - Redux - Router 完整项目](http://blog.csdn.net/mjzhang1993/article/details/79022633)
* [React-router-v4 - Webpack 实现按需加载（code-splitting）](http://blog.csdn.net/mjzhang1993/article/details/79094594)

## 目录结构说明

```
   ├── README.md
   ├── build                        // webpack 构建工具配置文件夹
   │   ├── utils.js                 // 一些工具文件
   │   ├── webpack.base.config.js   // 基础 webpack 配置文件
   │   ├── webpack.dev.config.js    // 开发环境配置
   │   └── webpack.prod.config.js   // 生产环境配置
   ├── config                       // 一些用户选项
   │   └── index.js                 // 一些可定制化的用户选项，协助配置 webpack
   ├── dist                         // 生产编译后的文件
   │   ├── index.html
   │   └── static
   │       ├── css
   │       │   └── app.ec6e1795a1.css
   │       └── js
   │           ├── app.ef434871b5.bundle.js
   │           ├── runtime.c7cc772ab3.bundle.js
   │           └── vendor.e69a77365d.bundle.js
   ├── package.json
   ├── server                       // 开发时，本地服务器
   │   ├── db.json
   │   └── index.js
   ├── src                          // 源码目录
   │   ├── api                      // 归纳一些需要 http 请求的 api
   │   │   ├── request.js           // 封装的网络请求模块
   │   │   └── root.js              // 某个模块的 网络请求部分
   │   ├── assets                   // 静态资源 图片、音频、视频等
   │   ├── components               // 展示型组件，按照容器组件分文件夹
   │   │   ├── App                  // App 容器组件子组件文件夹
   │   │   │   └── index.js
   │   ├── containers               // 容器组件
   │   │   ├── App.js
   │   │   ├── Home.js
   │   │   └── Test.js
   │   ├── index.html               // 页面模板
   │   ├── index.js                 // react 入口文件
   │   ├── modules                  // redux 模块，包括 reducer 部分与 action 部分
   │   │   ├── reducers.js          // 合并后的总的 reducer
   │   │   ├── home                 // 对应某个容器组件，集中了这个容器的 数据和 action
   │   │   │   ├── actions.js
   │   │   │   └── reducer.js
   │   │   └── types-constant.jsv   // 抽出来的 type 常量
   │   ├── router
   │   │   ├── Bundle.js            // 配置按需加载的外层组件
   │   │   ├── lazyLoad.js          // 嵌套按需加载组件的方法
   │   │   └── routes.js            // 基本路由配置
   │   ├── scss                     // 样式文件
   │   │   ├── _common.scss
   │   │   ├── app.scss
   │   │   ├── home.scss
   │   │   └── index.scss
   │   ├── store                    // store 配置
   │   │   ├── configureStore.js
   │   │   └── index.js
   │   └── utils                    // 公用的工具
   │       └── bindActions.js
   └── yarn.lock
```


