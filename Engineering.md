前端技术发展快速,使用很多新语言/新框架可以提高开发效率,但是需要转换成浏览器能够识别的js/html/css,该过程称之为构建.

构建其实是工程化在前端开发的体现,手动处理很繁琐,将一系列流程交给代码完成,自动化执行,解放生产力.

构建主要做的事情有:

- 代码转换：TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等。
- 文件优化：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等。
- 代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载。
- 模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件。
- 自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器。
- 代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过。
- 自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统。

经过多年的发展， Webpack 已经成为构建工具中的首选：

- 大多数团队在开发新项目时会采用紧跟时代的技术，这些技术几乎都会采用“**模块化+新语言+新框架**”，Webpack 可以为这些新项目提供一站式的解决方案；
- Webpack 有良好的生态链和维护团队，能提供良好的开发体验和保证质量；
- Webpack 被全世界的大量 Web 开发者使用和验证，能找到各个层面所需的教程和经验分享。

# webpack

项目内安装webpack

```shell
# npm i -D 是 npm install --save-dev 的简写，是指安装模块并保存到 package.json 的 devDependencies

# 安装最新稳定版
npm i -D webpack

# 安装指定版本
npm i -D webpack@<version>

# 安装最新体验版本
npm i -D webpack@beta
```



执行 webpack 构建命令

```shell
node_modules/.bin/webpack --config webpack.config.js

# 全局安装(建议) webpack-cli 后可以直接使用 webpack 命令
```



Loader 可以看作具有文件转换功能的翻译员，配置里的 `module.rules` 数组配置了一组规则，告诉 Webpack 在遇到哪些文件时使用哪些 Loader 去加载和转换。 如上配置告诉 Webpack 在遇到以 `.css` 结尾的文件时先使用 `css-loader` 读取 CSS 文件，再交给 `style-loader` 把 CSS 内容注入到 JavaScript 里。 在配置 Loader 时需要注意的是：

- `use` 属性的值需要是一个由 Loader 名称组成的数组，Loader 的执行顺序是由后到前的；
- 每一个 Loader 都可以通过 URL querystring 的方式传入参数，例如 `css-loader?minimize` 中的 `minimize` 告诉 `css-loader` 要开启 CSS 压缩。

重新执行 Webpack 构建前要先安装新引入的 Loader.

style-loader

工作原理大概是把 CSS 内容用 JavaScript 里的字符串存储起来， 在网页执行 JavaScript 时通过 DOM 操作动态地往 HTML head 标签里插入 HTML style 标签。



## 	常用的loader

## 	常用的webpack

## 	webpack构建流程

## 	提高webpack效率工具

## 	source map

## 	模块打包原理

## 	文件监听原理

## 	热更新原理

## 	对bundle体积进行监控和分析

## 	文件指纹

## 	如何优化 Webpack 的构建速度

## 	loader如何写

## 	plugin如何写

## 	打包优化

## 	编译优化

## 	webpa如何实现动态导入

## 	webpack的编译阶段

# babel

[Babel](https://babeljs.io/)是一个广泛使用的转码器，可以将ES6代码转为ES5代码，从而在现有环境执行。

​	AST
​	babylon
​	babel-traverse
​	babel-generator
​	babel打包后生成了什么





# Hybrid

​	混合方案
​	交互原理
​	接入方案
​	优化

# 工程化的理解

# 实现一个组件库

# cli

​	cli插件机制

# 模板引擎

# 发布平台

# nginx

# docker

# 微服务

# 项目监控