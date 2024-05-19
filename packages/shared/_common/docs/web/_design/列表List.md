# 列表List

列表用一个连续的列来显示多行元素，常用于具有相同构成及内容的模块批量展示，可承载多样化的信息内容，从纯文字到复杂的图文组合。





### 基础文字列表
仅包含简单文字的列表。对较简单的信息进行陈列时，如操作列表等。

![基础列表](https://tdesign.gtimg.com/site/design/images/基础列表-1834812.jpg)



### 多行文字列表

仅包含主要文字及描述性文字的列表。对较复杂的，包含多个字段或内容的信息进行展示时。

![多行文字列表](https://tdesign.gtimg.com/site/design/images/多行文字列表-1834823.jpg)



### 基础图文列表

包含简单图文的列表。需使用图片和文字结合展示信息。

![基础图文列表](https://tdesign.gtimg.com/site/design/images/基础图文列表-1834832.jpg)



### 带操作列表

包含图文信息及操作的列表。需展示较复杂的信息结构，表格无法满足时，同时需要对所在列进行操作。

![带文字操作列表](https://tdesign.gtimg.com/site/design/images/带文字操作列表-1834853.jpg)

![带图标操作列表2](https://tdesign.gtimg.com/site/design/images/带图标操作列表2.jpg)






## 组件设计指南


### 何时使用

需批量展示具有相同构成及内容的模块时；

需展示多样的结构化的信息时。

### 组件搭配使用



##### 列表与加载搭配使用

<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/20211102120646.png" />
<em>图示：滚动加载更多</em>

<hr />

<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/20211102120730.png" />
<em>图示：点击加载更多</em>

<hr />

##### 列表与分页搭配使用

<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/20211221152123.png" />



### 推荐/慎用示例

##### 列表建议只展示用户必须的信息，将其余的信息及字段隐藏。


<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/20211221155319.png" />
<img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />

<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/20211221155329.png" />
<img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />

<hr />

##### 列表适合展示多个相同结构的内容，如果字段类型过多且简短，建议使用表格。

<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/20211221155358.png" />
<img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />


<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/20211221155408.png" />
<img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />

<hr />

##### 列表的操作建议保证在3个及以内，尽量不超出。超出使用下拉菜单收纳，不建议放出过多操作。


<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/20211221155419.png" />
<img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />


<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/20211221155429.png" />
<img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />

### 相似组件

| 相似组件     | 何时使用                                                     |
| :-------- | :----------------------------------------------------------- |
|[列表](./List) | 用一个连续的列来显示多行元素，常用于具有相同构成及内容的模块批量展示，可承载多样化的信息内容，从纯文字到复杂的图文组合。 |
| [表格](./Table) | 常用于展示同类结构下的多种数据，易于组织、对比和分析等，并可对数据进行搜索、筛选、排序等操作。 |
