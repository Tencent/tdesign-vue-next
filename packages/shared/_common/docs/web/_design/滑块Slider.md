# Slider 滑块

滑块（滑动型输入器），是帮助用户在连续或间断的区间内，通过滑动来选择合适数值（一个数值或范围数值）的控件。

## 单游标滑块

在滑动轴上，只有一个游标，称为单游标滑块。

### 横向单游标滑块：

demo

### 纵向单游标滑块：

demo

## 双游标滑块

在滑动轴上，有两个游标，称为双游标滑块。

### 横向双游标滑块：

demo

### 纵向双游标滑块：

demo

##### 禁用状态的滑块



## 组件设计指南

### 何时使用

在数值输入过程中，需要提供实时的可视化数据比例反馈时。

### 与页面布局相关

##### 在表单中使用，通常布局在表单内部，关联其他表单项进行数据输入。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/1.png" />
  </div>

  <div class="item"></div>
</div>

##### 在整个页面中使用，通常布局在页面内容区下方，通过调整滑块控制内容区域。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/2.png" />
  </div>

  <div class="item"></div>
</div>


### 组件搭配使用

##### 与数值输入框搭配使用时，能帮用户对数值进行精确输入、快速的调整。

<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/Slider_3.png" />
<em>图示：与无按钮的数字输入框搭配</em>


<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/Slider_4.png" />
<em>图示：与带按钮的数字输入框搭配</em>



<hr />


##### 与气泡搭配使用，能实时提示滑块所在位置的具体数值。

<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/5.png" />




### 推荐/慎用示例

##### 当滑动条可选的数值范围较大时，避免游标步长太短，造成视觉辨识和操作困难。


<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/6.png" />
<img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />

    
<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/7.png" />
<img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />


<hr />




##### 当有多个刻度区间时，避免区间数值不一致,造成滑块调整不准确。


<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/8.png" />
<img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />


<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/9.png" />
<img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />


<hr />


## 相似组件

| 组件名 | 何时使用                                                     |
| :----- | :----------------------------------------------------------- |
| [滑块](./slider)       | 在数值输入过程中，需要提供实时的数据视觉比例反馈时。         |
| [进度条](./progress)   | 展示操作的当前进度时。                                       |

