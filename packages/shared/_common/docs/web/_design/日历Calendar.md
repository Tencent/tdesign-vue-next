# Calendar 日历

按照日历形式展示数据或日期的容器。




### 事项日历

在日期中可显示事项的日期显示容器。常用于有足够空间，且需要承载或显示事项信息时使用。

<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/image2020-8-11_11-34-2.png"/>

### 卡片日历

以独立日期为单位，嵌套在空间有限的容器内，用以展示日期等信息。



## 组件设计指南


### 何时使用

当需要展示或操作与“日期”相关数据时。

### 与页面布局相关

##### 事项日历面板，通常单独出现在整个页面内容区中。


<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E6%97%A5%201.png" />

<hr />

##### 卡片日历面板，通常单独出现在位置有限的内容区、卡片内或表单内显示。

<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E6%97%A5%202.png" />


### 常见用法

##### 事项日历中，可用图标、颜色、文字等形式将事项进行分类，例如：分为警告事件、正常事件和错误事件。


<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E6%97%A5%203.png" />

### 相似组件

| 组件名 | 何时使用                                                                       |
| :----- | :----------------------------------------------------------------------------- |
| [日 历](./calendar) | 同一页面内容篇幅较长，用户需要快速定位到某部分内容时，可通过锚点进行内容间的跳转。 |
| [日期选择器](./date-picker)| 当内容过多时，可以将不同类型内容分类，使用选项卡进行扁平化收纳。                |
