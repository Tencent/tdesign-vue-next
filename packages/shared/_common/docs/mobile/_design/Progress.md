# 进度条 Progress

## 组件设计指南

### 何时使用

当有一项系统任务正在进行，需要向用户展示该任务的当前进度时使用。

### 与页面布局相关

##### 当展示页面、模块的加载进度时，通常进度条放置在页面、模块的正中间。

<div class="legend">
  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/mobile-guide/progress/progress-1.png" />
  </div>

  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/mobile-guide/progress/progress-2.png" />
  </div>
</div>

### 常见用法

##### 通常用于任务周期较长的场景中，配有文字或图标显示进度和状态。

<div class="legend">
  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/mobile-guide/progress/progress-3.png" />
  </div>
</div>

<hr />

##### 当任务时间较短、或难以预估剩余时间时，通常弱化进度的百分比信息，如使用隐藏数值进度条、或微型的环形进度条。

<div class="legend">
  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/mobile-guide/progress/progress-4.png" />
  </div>

  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/mobile-guide/progress/progress-5.png" />
  </div>
</div>


### 推荐/慎用示例

##### 若任务需要等待的时间很长，可以提供大概的时间估计，让用户更有预期。

<div class="legend">
  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/mobile-guide/progress/progress-6.png" />
    <img class="tag" src="https://tdesign.gtimg.com/site/doc/good.png" />
  </div>
</div>


### 相似组件

| 组件名            | 何时使用                                   |
| :---------------- | :----------------------------------------- |
| [加载](./loading) | 当打开新页面或操作完成后，等待加载时使用。 |
