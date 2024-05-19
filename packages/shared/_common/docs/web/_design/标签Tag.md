# 标签 Tag
定义：标签是一种可自定义的关键词形式，常用于标记、分类和选择信息内容，可以概括主要信息，比分类更准确和具体。



## 标签类型


### 基础标签
基础标签为默认的标签样式。适用于常规表单。可自定义描边、填充、颜色、圆角等样式。

demo

### 带图标的标签
在标签内嵌入图标。适用于用图标来辅助标签分类，或表达标签的属性。

demo

### 可删除和添加的标签
可删除或添加的标签。可删除标签分两种：隐藏叉和显示叉，添加标签可组合输入框组件使用。

demo

### 可选择的标签
标签有已选和未选两种状态，可以通过点击标签来切换。可选择标签常用于多个标签的选择场景，类似checkbox的效果，点击切换选中效果。

demo


### 超长省略文本的标签
当标签文本过多时，可省略显示
demo

### 不同尺寸的标签

demo

### 不同形状的标签

demo


## 组件设计指南

### 何时使用

需要标记信息内容的属性和维度时；

数据量较多，需要通过关键词快速获取相关内容时；

用户需要以自己习惯的方式对数据进行分类时。

### 组件搭配使用

##### 与列表搭配使用，可以通关标签对列表中的内容进行筛选。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/tag1%402x.png" />
    <em></em>
  </div>

  <div class="item">
  </div>
</div>



<hr />

##### 与搜索框搭配使用，可以减少用户输入步骤，进行关键词快速检索。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E6%A0%87%E7%AD%BE-2@2x.png" />
  </div>

  <div class="item"></div>
</div>


<hr />

##### 与按钮搭配使用，可以对标签进行管理。


<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E6%A0%87%E7%AD%BE-3@2x.png" />




### 推荐/慎用示例


##### 标签在样式上应与文字信息做区分，避免用户忽略标签的交互作用。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/tag4%402x.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/tag5%402x.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />
  </div>
</div>

<hr />

##### 每个标签字数不宜过长，应限制在2-6个字，字数太长会造成阅读和检索困难。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E6%A0%87%E7%AD%BE-6@2x.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E6%A0%87%E7%AD%BE-7@2x.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />
  </div>
</div>

<hr />


##### 标签不宜添加过多，一般控制在3-5个，太多关键词堆砌会造成用户不易查找。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E6%A0%87%E7%AD%BE-8@2x.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E6%A0%87%E7%AD%BE-9@2x.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />
  </div>
</div>

<hr />

##### 标签应保证与文章内容的相关性，避免用户对内容产生误判。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/tag10%402x.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/tag11%402x.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />
  </div>
</div>

<hr />



### 相似组件

按钮在使用过程中，需要注意区分与 菜单、文字链 的区别。

| 组件名 | 何时使用                                                     |
| :----- | :----------------------------------------------------------- |
| [标签](./tag)   | 需要标记信息内容的属性和维度时；数据量较多，需要通过关键词快速获取相关内容时；用户需要以自己习惯的方式对数据进行分类时。  |
| [按钮](./button)   | 标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。                  |
