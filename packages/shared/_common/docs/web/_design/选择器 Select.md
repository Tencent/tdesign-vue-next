# 选择器 Select

用于收纳大量选项的信息录入类组件。







### 单选选择器

提供单选的选择器，选取后只展示单个内容。

![单选选择器](https://tdesign.gtimg.com/site/design/images/单选选择器-1851283.jpg)


### 多选选择器

提供多选的选择器，通过标签展示多选内容。

![多选选择器](https://tdesign.gtimg.com/site/design/images/多选选择器-1851290.jpg)

### 可折叠选项多选选择器

多选情况下折叠选中项，超出该数值的选中项折叠。
### 不同尺寸的选择器
提供大中小三种不同高度、宽度的选择器，以适应不同尺寸布局。

#### 不同高度尺寸

![不同高度尺寸](https://tdesign.gtimg.com/site/design/images/不同高度尺寸-1851323.jpg)


#### 不同宽度尺寸

![不同宽度尺寸](https://tdesign.gtimg.com/site/design/images/不同宽度尺寸-1851330.jpg)


### 直传options选择器
直传options选择器。通常在对于t-option无特殊要求时使用，便于书写。

### 支持透传popupProps，自定义下拉列表宽度选择器
自定义下拉样式的选择器，在需要自定义下拉样式时使用。

### 分组选择器

对信息进行分组的选择器，能够直观呈现方便用户辨识。在有层级关系，但选项内容较少的场景下使用。

![分组选择器](https://tdesign.gtimg.com/site/design/images/分组选择器-1851297.jpg)

### 可过滤选择器
输入过滤已选项。在有特定诉求的业务场景时使用。默认过滤文本，有filter方法时，按照filter方法过滤。

### 远程搜索选择器
可根据需求定制选择器内容。在有复杂逻辑或有特定诉求的业务场景时使用。reserveKeyword 用于multiple且filterable时，选中一个选项后保留当前的搜索关键词。

### 可创建新条目选择器
允许用户创建新条目，需配合filterable使用。

### 限制可选数目选择器

限制多选选择器的最大可选数目。通常在需要限制多选可选数目时使用。

### 可定制选择器

可根据需求定制选择器内容。通常在复杂逻辑或有特定诉求的业务场景下使用。

![可定制选择器](https://tdesign.gtimg.com/site/design/images/可定制选择器-1851304.jpg)



### 文字选择器/无边框选择器

通过文字按钮触发的选择器，用于修改内容。通常在空间受限、并且需要轻量化选择的场景使用。

![文字选择器](https://tdesign.gtimg.com/site/design/images/文字选择器-1851312.jpg)

### 已选值为对象的选择器
（名字和描述找哲哥）
定制已选项输出值类型，在需要输出选中值包含label时使用。

### 定制数据keys选择器
（名字和描述找哲哥）
定制数据keys。在options数据key不为label或value时使用。




## 组件设计指南




### 何时使用

需要在有限的空间展示大量选项，并从中选取单个或多个选项时。

### 与页面布局相关
##### 选择器下拉面板出现时，应确保其布局在页面可视区内。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/selecter_1.png"/>
    <em>图示：在左上角，向右下角展开</em>
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/selecter_2.png"/>
    <em>图示：在右上角，向左下角展开</em>
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/selecter_3.png"/>
    <em>图示：在左下角，向右上角展开</em>
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/selecter_4.png"/>
    <em>图示：在右下角，向左上角展开</em>
  </div>
</div>


### 组件搭配使用

##### 与搜索框搭配使用，当选项较多时，便于用户快速搜索到相关对象。
<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E9%80%89%E6%8B%A9%E5%99%A8-------5@2x.png" />
  </div>

  <div class="item"></div>
</div>



### 相似组件

| 组件名   | 何时使用                                                     |
| :------- | :----------------------------------------------------------- |
| [选择器](./select)   | 需要在有限的空间展示大量选项，并从中选取单个或多个选项时。用于收纳较多选项入口时。 |
| [下拉菜单](./dropdown) | 下拉菜单主要用于对过多的操作进行收纳，常跟随于按钮后面，点击后是触发相应的操作。 |

