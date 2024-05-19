### 何时使用

当需要输入日期时；

当需要输入一个日期区间时；

多用于表单中日期输入，或数据筛选条件中进行日期条件输入时。

### 与页面布局相关

在页面中，日期选择器可放置于页面顶部或内容模块上方，与下方数据结果产生联动。

<div class="legend">
  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/guide/date-picker/date-picker-1@2x.png" />
    <em>图示：位于页面或内容左上方</em>
  </div>

  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/guide/date-picker/date-picker-2@2x.png" />
    <em>图示：位于页面或内容右上方</em>
  </div>
</div>

### 组件搭配使用

##### 与表格搭配使用，按日期或日期区间对表格数据进行筛选。

<img src="https://tdesign.gtimg.com/site/design/guide/date-picker/date-picker-3@2x.png" />

<hr />

##### 与按钮单选框搭配使用，将用户高频关注的时间段设为默认选项，进行快捷切换以减少用户操作步骤。

<img src="https://tdesign.gtimg.com/site/design/guide/date-picker/date-picker-4@2x.png" />

<hr />

##### 与选择器搭配使用，对选择的颗粒度（年、月、日）进行切换，常用于日期选择器类型的选择。

<img src="https://tdesign.gtimg.com/site/design/guide/date-picker/date-picker-5@2x.png" />

### 常见用法

在筛选实时数据时，如订单量、费用账单等，日期选择器禁止选择未发生的日期，避免筛选结果无数据。

<div class="legend">
  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/guide/date-picker/date-picker-6@2x.png" />
  </div>
</div>

### 推荐/慎用示例

##### 带快捷标签选择器中标签内容尽可能简洁明了；如：使用“近 7 天”而非“最近 7 天数据”。

<div class="legend">
  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/guide/date-picker/date-picker-7@2x.png" />
    <img class="tag" src="https://tdesign.gtimg.com/site/doc/good.png" />
  </div>
  
  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/guide/date-picker/date-picker-8@2x.png" />
    <img class="tag" src="https://tdesign.gtimg.com/site/doc/bad.png" />
  </div>
</div>

<hr />

##### 带快捷标签选择器中标签数量最多不超过 5 个。

<div class="legend">
  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/guide/date-picker/date-picker-9@2x.png" />
    <img class="tag" src="https://tdesign.gtimg.com/site/doc/good.png" />
  </div>
  
  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/guide/date-picker/date-picker-10@2x.png" /> 
    <img class="tag" src="https://tdesign.gtimg.com/site/doc/bad.png" />
  </div>
</div>

<hr />

##### 录入出生年月日等具有特殊规则或用户熟悉的日期信息时，建议使用输入框而不是日期选择器，以提高操作效率。

<div class="legend">
  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/guide/date-picker/date-picker-11@2x.png" />
    <img class="tag" src="https://tdesign.gtimg.com/site/doc/good.png" />
  </div>
  
  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/guide/date-picker/date-picker-12@2x.png" /> 
    <img class="tag" src="https://tdesign.gtimg.com/site/doc/bad.png" />
  </div>
</div>

### 相似组件

| 组件名                     | 何时使用                                                                                                       |
| :------------------------- | :------------------------------------------------------------------------------------------------------------- |
| [日期选择器](./datepicker) | 当用户需要输入日期时；当用户需要输入一个日期区间时；多用于表单中日期输入，或数据筛选条件中进行日期条件输入时。 |
| [时间选择器](./timepicker) | 当在表单中需要时间输入，或表格中需要进行时间条件筛选时。                                                       |
| [日 历](./Calendar)        | 当需要展示或操作与“日期”相关数据时使用，可支持年/月形式的切换。                                                |
