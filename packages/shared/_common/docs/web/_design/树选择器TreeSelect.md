# 树选择器 TreeSelect


## 组件设计指南

### 何时使用

用于选取树形结构数据，如文件结构、组织架构、地理行政区等。

### 组件搭配使用

与搜索框搭配使用，通过关键词筛选数据内容，便于用户在树结构中快速找到所需信息。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/treeselect%20a.png" />
  </div>
</div>

### 常见用法

##### 树选择中父子结构可包含多维度字，如班级、同学。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/treeselect%20b.png" />
  </div>
</div>

<hr />

##### 多选树选择中父子项具有联动关系，当子项部分选中时，父项为半选中状态；点击半选中状态的多选框，执行全选操作；当子项全被选中时，父项为选中状态。


<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/20211221142525.png" />


### 推荐/慎用示例

##### 当树选择项较多时，默认折叠树层级结构，快速定位目标一级选项，如省市数据，可先快速定位省，再找到市。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/treeselect%20ba.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
  </div>
  
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/treeselect%20bb.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />
  </div>
</div>

<hr />

##### 树选择各层级选项的父子关系应具备逻辑相关性，数据结构由大到小，避免归属关系混乱。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/treeselectea.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
  </div>
  
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/treeselecteb.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />
  </div>
</div>

### 相似组件

| 组件名 | 何时使用                                                     |
| :----- | :----------------------------------------------------------- |
| [树选择](./treeselect)   | 用于选取树形结构数据，如文件结构、组织架构、地理行政区等。 |
| [级联选择器](./Cascader)   | 当数据集合较大，用户需要从有清晰层级结构的数据集合中进行选择时。                     |
| [穿梭框](./Transfer)   | 一组数据进行两种状态的分类时；总类和子类的选项筛选时。                     |
| [树](./tree) | 用于承载有父子关系的结构化内容，提供内容层级的展示。       |
