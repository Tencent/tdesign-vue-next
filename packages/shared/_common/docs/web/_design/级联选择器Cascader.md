# Cascader 级联选择器

对具有清晰父子层级结构的数据集合进行查看和使用的选择器，用户可以通过由大到小的顺序逐级查看数据集合并选择对应数据。


### 单选级联选择器

适用于单个对象的选取，选取结果呈现每一层级所选的内容。常用于系统层级、物件分类等。

<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/image2020-8-12_16-50-36.png"/>

### 多选级联选择器

允许同时选择多个对象，选取结果通过标签呈现选择的对象。常用于省市区。

<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/image2020-8-12_17-14-47.png"/>

### 父子节点选择解耦

父子节点选择无关联关系，每一层对象可单独选择，选取结果通过标签呈现选择的对象。常用于省市区。

<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/image2020-9-23_15-9-49.png"/>


## 组件设计指南

### 何时使用

当数据集合较大，且子集合数据间有结构性关联，需要多级分类以便用户选择时；


当数据信息有明确的层级结构，需要用户逐级查看、选择使用时。


### 与页面布局相关

##### 在页面中，级联选择器可放置于页面顶部，与下方数据结果产生联动。
<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E7%BA%A7%E8%81%94-1@2x.png" />
    <em></em>
  </div>


</div>


##### 在表单中，级联选择器可放置于表单内容需要的顺序中，用于数据的选择和填写。


<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E7%BA%A7%E8%81%94-2@2x.png" />
    <em></em>
  </div>

</div>


### 组件搭配使用

##### 与搜索框搭配使用，通过关键词筛选数据内容，便于用户在不同层级中快速找到所需信息。 

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E7%BA%A7%E8%81%94-3@2x.png" />
    <em></em>
  </div>


</div>

### 常见用法

##### 一键全部清空。在全部选项末尾使用删除按钮，便于快速取消已选对象。 

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E7%BA%A7%E8%81%94-4@2x.png" />
    <em></em>
  </div>

  <div class="item"></div>
</div>

<hr />

##### 多次部分清空。在每个已选选项的标签中使用删除按钮，可以按需取消不需要的选项，且被删除的选项的子选项同时删除。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E7%BA%A7%E8%81%94-5@2x.png" />
    <em></em>
  </div>

 
</div>

### 推荐/慎用示例

##### 级联选择器的层级不宜超过4层，层级过多时应调整数据结构或改用其他交互方式。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E7%BA%A7%E8%81%94-6@2x.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E7%BA%A7%E8%81%94-7@2x.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />
  </div>
</div>

<hr />

##### 下拉菜单展开时需考虑所占面积，底层信息展开到页面外造成无法点击。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E7%BA%A7%E8%81%94-8@2x.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E7%BA%A7%E8%81%94-9@2x.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />
  </div>
</div>

<hr />

##### 在多层级中，各层级选项的归属关系应具备逻辑相关性，数据集合由大到小，采取 3→2→1 的结构，避免归属关系混乱。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E7%BA%A7%E8%81%94-10@2x.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E7%BA%A7%E8%81%94-11@2x.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />
  </div>
</div>


### 相似组件

| 组件名     | 何时使用                                                   |
| :-----     | :--------------------------------------------------------- |
| [级联选择器](./cascader) | 当数据集合较大，用户需要从有清晰层级结构的数据集合中进行选择时。     |
| [穿梭框](./transfer)     | 一组数据进行两种状态的分类时；总类和子类的选项筛选时。     |
| [树](./tree)         | 用于承载有父子关系的结构化内容，提供内容层级的展示。       |
