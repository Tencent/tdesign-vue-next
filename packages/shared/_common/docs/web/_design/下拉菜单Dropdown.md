# 下拉菜单Dropdown

### 文字下拉菜单
文字按钮触发下拉菜单。常用于空间极度受限的收纳操作场景，一般用于表格内详情操作的收纳。

demo

### 按钮下拉菜单
普通按钮触发下拉菜单。常用于操作收纳场景。

demo


### 带分割线下拉菜单
通过分割线区分不同的下拉菜单操作。常用于需要区分不同操作结果的场景。
demo


### 多层下拉菜单
带逻辑层级关系的操作下拉菜单。常用于需要收纳多层逻辑的操作场景。
demo

### 不可用菜单项
demo

### 自定义其他属性
demo


### 高尺寸的下拉菜单
demo


### click 事件
demo

### slot 方式使用
demo




## 组件设计指南


### 何时使用

当需要在不影响页面结构的情况下，集成多种操作时；


当功能模块入口较多，需收纳部分低频入口，减少对空间的占用时。



### 与布局相关

##### 下拉菜单在页面内四个区域会有不同的布局方式。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/Dropdown_1.png" />
    <em>图示：在左上角，向右下角展开</em>
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/Dropdown_2.png" />
    <em>图示：在右上角，向左下角展开</em>
  </div>
</div>

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/Dropdown_3.png" />
    <em>图示：在左下角，向右上角展开</em>
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/Dropdown_4.png" />
    <em>图示：在右下角，向左上角展开。</em>
  </div>
</div>

<hr />



### 推荐/慎用示例


##### 针对重要或逻辑相反的操作，应与其他操作进行区分，并至降低优先级减少误触。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/Dropdown_5.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/20211222183818.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />
  </div>
</div>

<hr />


##### 当菜单项过多时，应对其进行分类或分级显示，避免菜单太长，造成操作不便。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/Dropdown_7.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/20211222183640.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />
  </div>
</div>

<hr />

### 相似组件

| 组件名 | 何时使用                                                     |
| :----- | :----------------------------------------------------------- |
| [下拉菜单](./dropdown)   | 当需要在不影响页面结构的情况下，集成多种操作时；当功能模块入口较多，需收纳部分低频入口，减少对空间的占用时。 |
| [选择器](./select)   | 需要在有限的空间展示大量选项，用来进行数据处理时。                     |

