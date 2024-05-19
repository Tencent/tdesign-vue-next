# 悬浮按钮 Fab

## 组件设计指南

### 何时使用

当某个操作为全局操作，且为用户高频/业务强推的操作时可使用。

### 与页面布局相关

##### 为了避免遮挡页面中重要内容，通常将悬浮按钮放置于页面右下角，当页面中没有底部标签栏时，也可以考虑放置于中下位置。

<div class="legend">
  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/mobile-guide/fab/fab-1.png" />
    <em></em>
  </div>

  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/mobile-guide/fab/fab-2.png" />
    <em></em>
  </div>
</div>

<div class="legend">
  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/mobile-guide/fab/fab-3.png" />
    <em></em>
  </div>
</div>


### 组件搭配使用

##### 悬浮按钮与[动作面板](./action-sheet)组合使用，当触发悬浮按钮涉及的任务通过若干种方式达成，可以用动态面板来承载这若干种方式的操作。

<div class="item">
   <img src="https://tdesign.gtimg.com/site/design/mobile-guide/fab/fab-4.png" />
   <em></em>
</div>


### 推荐/慎用示例

##### 通常情况下页面中建议只使用一个悬浮按钮；若页面以地图、看板为主要场景，需要出现多个悬浮按钮时，建议通过样式区分主次、层级关系。

<div class="legend">
  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/mobile-guide/fab/fab-5.png" />
    <img class="tag" src="https://tdesign.gtimg.com/site/doc/good.png" />
  </div>

  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/mobile-guide/fab/fab-6.png" />
    <img class="tag" src="https://tdesign.gtimg.com/site/doc/bad.png" />
  </div>
</div>

<hr />

##### 图标加文字悬浮按钮上的字数建议精简，控制在2-4个字左右，避免遮挡过多页面内容。

<div class="legend">
  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/mobile-guide/fab/fab-7.png" />
    <img class="tag" src="https://tdesign.gtimg.com/site/doc/good.png" />
  </div>

  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/mobile-guide/fab/fab-8.png" />
    <img class="tag" src="https://tdesign.gtimg.com/site/doc/bad.png" />
  </div>
</div>


### 相似组件

| 组件名                  | 何时使用                                               |
| :---------------------- | :----------------------------------------------------- |
| [按钮](./button)        | 当前流程的结束或新流程的开启需要用户点击触发时使用。   |
| [返回顶部](./back-top ) | 当页面内容过长，用户有快速返回到页面顶部的诉求时使用。 |

