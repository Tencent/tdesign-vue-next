## DatePicker 日期选择器

用于选择某一具体日期或某一段日期区间。

### 年份选择器

用于年份的选择。用户仅需输入年份信息时使用，常用于如年账单等按年记录数据的查询场景。

demo

### 月份选择器

用于月份的选择。用户仅需输入月份信息时使用。

demo

### 日期选择器

用于具体日期的选择。用户仅需要输入非常具体的日期信息时使用。

demo

### 日期时间选择器

用于日期和时间相关联的选择。用户需要输入包含时间在内的日期时使用。

demo



### 日期区间选择器

用于某一段日期的选择。用户需要输入一段日期区间时使用。

demo




### 带快捷标签选择器

具有可提前设置的时间标签。当日期信息具有规律性，需要点击标签快捷输入时。

demo


### 禁用的日期选择器

可将不支持用户选择的日期禁止点击。


demo



## 组件设计指南

### 何时使用

当需要输入日期时；

当需要输入一个日期区间时；

多用于表单中日期输入，或数据筛选条件中进行日期条件输入时。


### 与页面布局相关

在页面中，日期选择器可放置于页面顶部或内容模块上方，与下方数据结果产生联动。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/datepicker1.png" />
    <em>图示：位于页面或内容左上方</em>
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/datepicker2.png" />
    <em>图示：位于页面或内容右上方</em>
  </div>
</div>

### 组件搭配使用

##### 与表格搭配使用，按日期或日期区间对表格数据进行筛选。


<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/datepicker3.png" />


<hr />

##### 与按钮单选框搭配使用，将用户高频关注的时间段设为默认选项，进行快捷切换以减少用户操作步骤。


<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/datepicker4.png" />


<hr />

##### 与选择器搭配使用，对选择的颗粒度（年、月、日）进行切换，常用于日期选择器类型的选择。

<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/datepicker5.png" />


### 常见用法

在筛选实时数据时，如订单量、费用账单等，日期选择器禁止选择未发生的日期，避免筛选结果无数据。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/datepicker6.png" />
  </div>
</div>

### 推荐/慎用示例


##### 带快捷标签选择器中标签内容尽可能简洁明了；如：使用“近7天”而非“最近7天数据”。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/D7.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
  </div>
  
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/D8.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />
  </div>
</div>

<hr />

##### 带快捷标签选择器中标签数量最多不超过5个。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/D9.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
  </div>
  
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/D10.png" /> 
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />
  </div>
</div>

<hr />

##### 录入出生年月日等具有特殊规则或用户熟悉的日期信息时，建议使用输入框而不是日期选择器，以提高操作效率。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/Group 661.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
  </div>
  
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/D12.png" /> 
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />
  </div>
</div>

### 相似组件

| 组件名     | 何时使用                                                     |
| :--------- | :----------------------------------------------------------- |
| [日期选择器](./datepicker)  | 当用户需要输入日期时；当用户需要输入一个日期区间时；多用于表单中日期输入，或数据筛选条件中进行日期条件输入时。 |
| [时间选择器](./timepicker)  | 当在表单中需要时间输入，或表格中需要进行时间条件筛选时。 |
| [日 历](./Calendar)       | 当需要展示或操作与“日期”相关数据时使用，可支持年/月形式的切换。                     |

