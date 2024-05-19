# 滑动操作 SwipeCell

## 组件设计指南

### 何时使用

需要针对列表项目进行某项低频的辅助操作时使用。

### 组件搭配使用

##### 与[单元格](./cell)、[按钮](./button)组合使用，单元格作为承载滑动操作的容器，左右滑动后展示操作项的按钮。

<div class="legend">
  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/mobile-guide/swipe-cell/swipe-cell-1.png" />
  </div>

  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/mobile-guide/swipe-cell/swipe-cell-2.png" />
  </div>
</div>


### 常见用法

##### 通常使用在对话列表、收藏列表、购物车等场景中，承载删除、收藏等辅助操作。

<div class="legend">
  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/mobile-guide/swipe-cell/swipe-cell-3.png" />
  </div>

  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/mobile-guide/swipe-cell/swipe-cell-4.png" />
  </div>
</div>

<hr />

##### 通常左滑后展示删除按钮，若删除操作重要且无法撤回，可在滑动操作中对删除进行二次确认。

<div class="item">
  <img src="https://tdesign.gtimg.com/site/design/mobile-guide/swipe-cell/swipe-cell-5.png" />
</div>


### 推荐/慎用示例

##### 左右滑动操作通常承载低频的辅助功能，不建议承载高频或过于复杂的功能。

<div class="item">
  <img src="https://tdesign.gtimg.com/site/design/mobile-guide/swipe-cell/swipe-cell-6.png" />
  <img class="tag" src="https://tdesign.gtimg.com/site/doc/bad.png" />
</div>

<hr />

##### 按钮的顺序、颜色使用需要符合用户预期。
<div class="item">
  <img src="https://tdesign.gtimg.com/site/design/mobile-guide/swipe-cell/swipe-cell-7.png" />
  <img class="tag" src="https://tdesign.gtimg.com/site/doc/bad.png" />
</div>

<hr />

##### 左滑的操作数不建议超过4个，右滑不建议超过1个，操作过多时应改用其它交互方式。
<div class="item">
  <img src="https://tdesign.gtimg.com/site/design/mobile-guide/swipe-cell/swipe-cell-8.png" />
  <img class="tag" src="https://tdesign.gtimg.com/site/doc/bad.png" />
</div>


### 相似组件

| 组件名           | 何时使用                                             |
| :--------------- | :--------------------------------------------------- |
| [按钮](./button) | 当前流程的结束或新流程的开启需要用户点击触发时使用。 |
