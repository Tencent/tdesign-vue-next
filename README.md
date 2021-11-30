# TDesign (Vue3-Web)

TDesign 是由前端通用 UI 组件库 Oteam 发起，协同公司内有组件库开发经验的同学一起建设的组件库

## 特性

- 前端通用 UI 组件库 Oteam Web Vue-Next 版实现

- 对接前端组件语言规范

- 与其他框架（Vue2 / React / Angular）版本 API、UI 保持一致
- 支持国际化（完善中）
- 支持按需加载

### 浏览器兼容性

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari |
| --------- | --------- | --------- | --------- |
| IE11, Edge| last 3 versions| last 3 versions| last 2 versions

## 安装

目前组件库处于在快速迭代中，注意留意版本变化，组件库现在只发布在内网仓库中，需要设置 npm 使用腾讯软件源的registry进行安装。

- 单次指定软件源安装

```shell
npm i tdesign-vue-next
```

## 使用

### 全局安装

```js
import { createApp } from 'vue';
import TDesign from 'tdesign-vue-next';
import App from 'xxxx';

const app = createApp(App);
app.use(TDesign)
```

### 默认支持按需引入,自带样式

```js
import { Button } from 'tdesign-vue-next';
import 'tdesign-vue-next/es/style/index.css'; // 少量公共样式
```

### 不带样式引入

```js
import { Button } from 'tdesign-vue-next/lib/';
import 'tdesign-vue-next/dist/tdesign.css'; // 如需样式请添加这行
```

## 参与贡献

### 开启 issue

如果你想要贡献一个新特性，请在实际写代码前先开一个 issue 与社区里的小伙伴一起讨论必要性及实现方案。

#### Github flow 贡献流程

- 请将本项目 fork 一份到自己空间，clone 至本地后，添加上游库地址： `git remote add upstream`
- 创建 feature 分支
- 开发过程中可以使用 `git fetch upstream` 或 `git rebase upstream/feature` 来同步上游分支代码
- 提交代码到 forked 仓库，commit message 撰写请参照 [Angular Commits 规范](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits)
- 在上游仓库中发起 pr
- 会有 PMC 同学来 CR 本次提交的代码，请及时关注 CR 评论通知信息并回复
- CR 通过后会合并进入 develop 分支，等待周迭代或紧急 patch 版本发布 npm

### 开发

```bash
git clone (repo path)
cd tdesign-web-vue-next
git submodule init
git submodule update

# 切换子仓库到 develop 分支
cd common
git checkout develop

# 开发预览
cd ..
npm i
npm run start

# 打开浏览器访问 http://127.0.0.1:16000
```

### 项目脚本

```bash
# 启动项目
npm run start
# 更新组件库图标
npm run update:icon
# 更新网站组件单元覆盖率徽章
npm run update:badge
# 编译站点
npm run site
# 编译站点预览
npm run site:preview
# 清除 npm run build 的编译结果
npm run prebuild
# 编译组件库
npm run build
# 快速创建组件及其相关文件
npm run init
# 执行端对端测试
npm run test:e2e
# 执行端对端测试（含 UI 界面）
npm run test:e2e-gui
# 运行行单元测试用例
npm run test:unit
# 服务端渲染测试
npm run test:node
# 运行单元测试监听模式，文件发生变化时，立即执行单元测试
npm run test:watch
# 单元测试覆盖率
npm run test:coverage
# 构建产物测试
npm run test:build-files
# 自动修复 eslint 错误
npm run lint:fix
# 查看 eslint 错误
npm run lint
```
