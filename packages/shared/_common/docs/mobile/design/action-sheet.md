

### 何时使用

需要提供一组与当前场景操作相关的关联操作时使用。

### 组件搭配使用

##### 动作面板与[按钮](./button)组合使用，通过按钮点击唤起动作面板。

  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/mobile-guide/action-sheet/action-sheet-1.png" />
  </div>


### 常见用法
##### 当用户完成一个事件可以通过若干种方式达成，可以用动态面板来承载这若干种方式的操作。

  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/mobile-guide/action-sheet/action-sheet-2.png" />
  </div>

<hr />

##### 当页面中有一组操作因低频/空间不足不希望外露时，但却必要存在，可以用动作面板来承载，通过“更多”按钮触发

  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/mobile-guide/action-sheet/action-sheet-3.png" />
  </div>



### 推荐/慎用示例

##### 动作面板中不建议提供太多操作项，若过多项在小屏手机中导致需纵向滚动，体验将会受损。

<div class="legend">
  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/mobile-guide/action-sheet/action-sheet-4.png" />
    <img class="tag" src="https://tdesign.gtimg.com/site/doc/good.png" />
  </div>

  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/mobile-guide/action-sheet/action-sheet-5.png" />
    <img class="tag" src="https://tdesign.gtimg.com/site/doc/bad.png" />
  </div>
</div>

<hr />

##### 动作面板中的操作项不建议用icon完成替代文字。

<div class="legend">
  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/mobile-guide/action-sheet/action-sheet-6.png" />
    <img class="tag" src="https://tdesign.gtimg.com/site/doc/good.png" />
  </div>
  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/mobile-guide/action-sheet/action-sheet-7.png" />
    <img class="tag" src="https://tdesign.gtimg.com/site/doc/bad.png" />
  </div>
</div>



### 相似组件

| 组件名                      | 何时使用                                                                                     |
| :-------------------------- | :------------------------------------------------------------------------------------------- |
| [抽屉](./drawer)            | 需要收折展示一组数量较多的菜单时使用。                                                       |
| [对话框](./dialog)          | 需要用户做一些决定，或这提供完成某个任务是需要的一些额外信息时使用。                         |
| [下拉菜单](./dropdown-menu) | 当内容较多时，需要通过筛选快速定位某一类内容时使用。                                         |
| [选择器](./dropdown-menu)   | 当需要在有限的空间展示大量选项供用户选择，或者一组选项由递进层级构成需要用户逐级选择时使用。 |
