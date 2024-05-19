# Tree 树

             

用于承载有父子关系的结构化内容，提供内容层级的展示。





### 基础树

可承载存在父子关系的内容的展示，父节点带有展开/折叠操作，提供单个节点的选中标记。常用于系统目录结构、组织架构的展示。

demo

### 带多选框的树

在基础树结构上提供多选框控件，当需要对多个节点进行选择时使用，如选择组织架构中的多个人员。

demo

### 带操作功能的树

在基础树结构上提供针对节点的操作按钮，当需要对节点进行一系列操作时使用，如增、删、改。

demo

### 自定义图标的树

可以对父节点上展开/折叠的图标进行自定义设计。当需要图标与信息名的含义匹配时使用，如文件夹的概念。

demo

### 带连接线的树

将树中的父节点与其层级内的子节点进行连线。该用法针对子项层级较深且较多的情况，需要更明确表示从属关系。

demo


## 组件设计指南


### 何时使用

当需要操作的内容需要层级或父子结构展示信息时。

### 与页面布局相关

##### 在页面中，树通常放置于内容区左侧，与右侧内容产生联动。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/tree-1.png" />
  </div>

  <div class="item"></div>
</div>


### 组件搭配使用

##### 与按钮搭配使用，可以通过按钮对树进行管理。按钮控制全局可放置标题右侧、或底部常驻，控制局部可放置在对应结点上。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/tree-2.png"/>
    <em>图示：按钮在底部常驻</em>
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/tree-3.png"/>
    <em>图示：按钮在标题右侧</em>
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/tree-4.png"/>
    <em>图示：按钮在结点显示</em>
  </div>
</div>

### 相似组件


| 组件名 | 何时使用                                                                       |
| :----- | :----------------------------------------------------------------------------- |
| [树](./tree)  | 同一页面内容篇幅较长，用户需要快速定位到某部分内容时，可通过锚点进行内容间的跳转。 |
| [导航菜单](./menu) | 当内容过多时，可以将不同类型内容分类，使用选项卡进行扁平化收纳。                |
