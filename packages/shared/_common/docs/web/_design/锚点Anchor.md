# Anchor 锚点
页面内的超级链接，用于跳转到页面内指定位置



### 基础锚点
锚点间不存在层级关系。适用于锚点间为同级关系时，属于页面结构简单的场景。

<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/1.png"/>

### 多级锚点
锚点内含有层级关系。适用锚点内含有父子级关系时，属于页面结构复杂的场景。

<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/2.png"/>

### 指定容器锚点
指定响应滚动的容器进行锚点定位。
补充demo

### 特定交互锚点
指定锚点定位后的交互, 包括: 高亮当前锚点、复制链接。
补充demo



## 组件设计指南


### 何时使用

##### 同一页面内容篇幅较长，用户需要快速定位查看某部分内容时，可通过锚点进行内容间的跳转。


### 与页面布局相关

##### 通常情况下，锚点固定在页面内容区左侧或右侧，配合内容进行操作。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/anchor-1@2x.png" />
    <em>图示：锚点定位位于内容区左侧</em>
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/anchor-2@2x.png" />
    <em>图示：锚点定位位于内容区右侧</em>
  </div>
</div>

### 相似组件

| 组件名 | 何时使用                                                                       |
| :----- | :----------------------------------------------------------------------------- |
| [锚 点](./anchor)  | 当内容篇幅较长，用户需要快速定位查看某部分内容时，可点击在同一页面的不同内容间的跳转。 |
| [选项卡](./tabs) | 当内容过多，需要将不同类型内容分类收纳，可点击在不同页面查看对应类型的内容。                |


  
