# 开关 Switch

用于两个互斥选项，用来打开或关闭选项的选择控件。






### 基础开关
不带描述，最基础、最常用的开关。

![基础开关](https://tdesign.gtimg.com/site/design/images/基础开关-1849347.jpg)


### 带描述的开关
开关内部带有文字或图标等描述，含义对应开关当前状态，切换时文字同步切换。视觉上更加醒目，用于需要描述当前开关对应状态及含义，更直观且方便用户理解。

![带描述的开关](https://tdesign.gtimg.com/site/design/images/带描述的开关-1849353.jpg)




## 组件设计指南


### 何时使用

需要表示开关状态或仅有两种状态之间的切换时；

需要操作后立即生效时。

### 组件常见用法


##### 与对话框搭配使用，当开启或关闭开关会带来操作风险时，可利用对话框进行二次确认。


<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/switch-1@2x.png" />



### 推荐/慎用示例

##### 开关文案要准确简洁，只需表达所控制的内容，避免加入逻辑词语或与开关作用相反的内容。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/switch-2@2x.png"/>
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/switch-3@2x.png"/>
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />
  </div>
</div>

<hr />




### 相似组件

| 组件名 | 何时使用                                                     |
| :----- | :----------------------------------------------------------- |
| [开关](./switch)   | 开关操作后，程序立即执行相关操作                             |
| [多选框](./checkbox) | 多选框一般用在表单里，仅反映当前的选择状态，需要点击额外的提交按钮后生效。 |
