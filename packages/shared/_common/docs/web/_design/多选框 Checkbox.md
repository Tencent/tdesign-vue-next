# 多选框 Checkbox

多选框是一个选择控件，允许用户通过单击在选中和未选中之间切换。




### 基础多选框
![多选框](https://tdesign.gtimg.com/site/design/images/多选框-1849945.jpg)

### 联动多选框

联动多选框指多选框与其他组件配合使用。
（demo需与开发对齐）

![联动多选框](https://tdesign.gtimg.com/site/design/images/联动多选框-1849952.jpg)

![批量操作按钮](https://tdesign.gtimg.com/site/design/images/批量操作按钮-1849962.jpg)


## 组件设计指南


### 何时使用

需要从一个数据集中选择多个选项时；

需要对两种状态进行切换时（选中或未选中，打开或关闭），可单独使用多选框；

需要一个标记控件，通过触发操作按钮后才生效时；



### 组件搭配使用

##### 与气泡提示搭配使用。多选框所在选项为必选项时，用户漏选则弹出气泡提示。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/checkbox-1@2x.png" />
  </div>

  <div class="item"></div>
</div>

<hr />

##### 与对话框搭配使用。多选框所在选项勾选时需警示或二次确认时，点击后可弹出模态对话框提示。

<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/checkbox-2@2x.png" />

### 常见用法

##### 多选框可在表单中单独使用。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/checkbox-3@2x.png" />
  </div>

  <div class="item"></div>
</div>


<hr />

##### 若需要通过操作多选框隐藏部分内容，可以使用就地隐藏/展开的方式。


<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/checkbox-4@2x.png" />


<hr />


### 推荐/慎用示例

##### 当选项较多且字段长度不一时，建议将多选框对齐。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/checkbox-5@2x.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/checkbox-6@2x.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />
  </div>
</div>


### 相似组件

| 组件名 | 何时使用                             |
| :----- | :----------------------------------- |
| [多选框](./checkbox) | 标记控件，需要与“提交”等操作结合使用。 |
| [开关](./switch)   | 即时生效的控件，可单独使用。           |


