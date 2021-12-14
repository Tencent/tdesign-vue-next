---
title: 最佳实践
description: 欢迎使用 TDesign Starter for Vue Next, 快速搭建你的项目!
spline: explain
---

<p>
<a href="https://tdesign.tencent.com/starter/vue-next/" target="_blank">
<img src="https://tdesign.gtimg.com/starter/brand-logo-light.png" class="__light__" style="height:44px;margin-top:0;"/>
<img src="https://tdesign.gtimg.com/starter/brand-logo-dark.png" class="__dark__" style="height:44px;margin-top:0;"/>
</a>
</p>
<p>
  <a href="https://npmjs.com/package/vite"><img src="https://img.shields.io/npm/v/vite.svg" alt="npm package"></a>&nbsp;
  <a href="https://nodejs.org/en/about/releases/"><img src="https://img.shields.io/node/v/vite.svg" alt="node compatility"></a>
</p>
<p>
  <a href="http://tdesign.tencent.com/starter/vue-next/">立即体验 </a>
  .
  <a href="https://github.com/TDesignOteam/tdesign-vue-next-starter">代码仓库</a>
  ·
  <a href="https://github.com/TDesignOteam/tdesign-vue-next-starter/issues/new">反馈问题</a>
</p>
<p>
  <img src="https://tdesign.gtimg.com/starter/starter.png" style="border-radius:6px;border:1px solid var(--component-border)"/>
</p>

### 项目简介

TDesign Starter 基于 TDesign UI 组件，旨在提供项目开箱即用的、配置式的并且拥有开发体验和设计感的中后台的项目。

- 设计美观

  - 基于 TDesign UI 设计规范
  - 提供 Figma、 Sketch、 Adobe XD、 Axure 等多种类型的设计资源
  - 在开源体系上打造具有自身品牌特色且好用的产品

- 完备路由

  - 同时支持配置式路由和自定义路由
  - 对于配置型路由，提供导航类组件的深度定制（“菜单 Menu”、“面包屑 Breadcrumb”），无需手动处理路由映射关系。

- 动态布局:

  - 内置“左右布局”、“上左右布局”、“上下布局”等中后台常用布局，
  - 页面内容基于 24 栅格布局设计，内置“常规型”和“紧凑型”两种间距模式

- 极速 HRM:

  - 采用 `Vite` 构建
  - 开发环境下体验浏览器 esmodule bundless, 达到极速更新，无需等待漫长的 bundle 过程

- 开发规范:
  - 统一规范会减少沟通成本，提高开发和维护的体验；
  - 代码规范采用`eslint-config-airbnb-base`,
  - 提交规范采用 `Angular commit 规范`

### 快速开始

通过 `tdesign-starter-cli` 初始化项目仓库

```bash
## 1、安装 tdesign-starter-cli
npm i tdesign-starter-cli@latest -g

## 2、创建项目
td-starter init
```

<p>
  <img src="https://tdesign.gtimg.com/starter/starter-cli.png" style="border-radius:6px;border:1px solid var(--component-border)"/>
</p>

### 项目脚本

```bash
## 安装依赖
npm install

## 启动项目
npm run dev

## 项目构建
npm run build

## 项目预览
npm run serve

## 项目lint
npm run lint

## 修复lint
npm run lint:fix

```

### 布局

网站布局支持“空布局”， “侧边栏导航布局”， “侧边栏布局加头部导航”，“头部导航”四种；布局文件地址在`src/layouts`

其中`src/layouts/td-layout`为动态布局，可以在`src/config/style.js`中进行个性化配置以下功能

- 左侧布局，顶部布局，混合布局
- 是否展示面包屑
- 是否展示 footer
- 是否展示紧凑版页面
- 主题切换（规划中）

  <br/>

更多定制化布局，推荐使用 TDesign UI layout

- `<t-layout>`
- `<t-header>`
- `<t-footer>`
- `<t-aside>`
- `<t-content>`

### 提交规范

整齐美观的提交规范，沟通维护更加省力, 本项目采用[Angular Git Commit Guidelines](https://zj-git-guide.readthedocs.io/zh_CN/latest/message/Angular%E6%8F%90%E4%BA%A4%E4%BF%A1%E6%81%AF%E8%A7%84%E8%8C%83/)

### 兼容性

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Edge >=16                                                                                                                                                                                                       | Firefox >=60                                                                                                                                                                                                      | Chrome >=61                                                                                                                                                                                                   | Safari >=11                                                                                                                                                                                                   |

### Contributors

<td-avatar username="pengYYYYY"></td-avatar>
<td-avatar username="uyarn"></td-avatar>
<td-avatar username="chrysalis1215"></td-avatar>
<td-avatar username="94dreamer"></td-avatar>
