# 按钮 Button
按钮用于开启一个闭环的操作任务，如“删除”对象、“购买”商品等。


### 基础按钮
基础按钮包括填充按钮、描边按钮、虚线按钮、和文字按钮。

#### 填充按钮
一般用于主按钮，是用户在整个页面需要关注优先级最高的操作，引导用户关注并操作。

#### 描边按钮
描边按钮常见白底加文字的形式，在视觉强调程度上弱于填充按钮，通常与填充按钮搭配成组使用。

#### 虚线按钮
按钮边框线为虚线，常用于表单中的添加配置项。

#### 文字按钮
直接使用文字作为按钮。是视觉吸引力最弱的一个按钮，通常出现在表格操作栏、标题和字段旁等。

<img width="" src="/uploads/72AB5E2571DF4AAA8768349930430899/image.png" alt="image.png" />




### 图标按钮
图标按钮由图标+文字或图标构成。通过图标可增强识别性，以便直观理解。

![ia_200000001](https://tdesign.gtimg.com/site/design/images/ia_200000001-1762689.png)



### 幽灵按钮
幽灵按钮将按钮的内容反色，背景变为透明，一般是底色透明。常用于有色背景上，例如 banner 图等。

![ia_200000002](https://tdesign.gtimg.com/site/design/images/ia_200000002.png)






### Block按钮

Block 按钮在宽度上充满其所在的父容器（无padding和margin值）。该按钮常见于移动端和一些表单场景中。

![ia_200000004](https://tdesign.gtimg.com/site/design/images/ia_200000004.png)



### 按钮组

按钮组就是指两个或两个以上的按钮排布在一起，显示多个相关操作。常见的按钮组合如“确定/取消”、“上一步/下一步”和表格头部操作等。

![ia_200000005](https://tdesign.gtimg.com/site/design/images/ia_200000005.jpg)


### 不同颜色主题按钮
提供浅灰色、红色、黄色和绿色为主题的按钮。

<img width="" src="/uploads/384AFBB7B5D54BB2A13D4D9607B554ED/image.png" alt="image.png" />

### 不同尺寸的按钮
提供 大、中（默认）、小 尺寸。
（补demo）


### 不同形状的按钮
提供 矩形、方型、圆角矩形、圆形。
（补demo）

### 不同状态的按钮
提供 加载状态、禁用状态。
（补demo）



## 组件设计指南

### 何时使用

当操作命令需要用户点击，触发相应业务逻辑时。


### 与页面布局相关

##### 在页面、表单、对话框等场景中按钮一般会处于用户浏览路径上，便于用户发现，高效引导行动。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/button-1@2x.png" />
    <em>图示：位于字段后面</em>
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/button-2@2x.png" />
    <em>图示：位于内容下方</em>
  </div>
</div>

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/button-3@2x.png" />
    <em>图示：位于起始点后面</em>
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/button-4@2x.png" />
    <em>图示：位于内容后面</em>
  </div>
</div>

<hr />

##### 主按钮通常单独使用，是页面里的最主要的视觉焦点，在一个页面中，建议最多只出现一个主按钮。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/button-5@2x.png" />
  </div>

  <div class="item"></div>
</div>


<hr />

##### 当有限的空间中需要放置按钮数量过多时，可以适当将次按钮折叠。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/button-6@2x.png" />
  </div>

  <div class="item"></div>
</div>


### 组件搭配使用

##### 不同类型按钮搭配使用，可以用来表达不同的强调级别。

<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/button-7@2x.png" />



### 推荐/慎用示例


##### 用户在使用主、次按钮时，需要表达主次关系，突出强调的最主要操作，其他操作使用次按钮，禁止同时使用多个主按钮。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/button-8@2x.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/button-9@2x.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />
  </div>
</div>

<hr />

##### 多个按钮组合使用时，每个按钮之间需存在一定间隔，不建议连在一起。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/button-10@2x.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/button-11@2x.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />
  </div>
</div>

### 相似组件


| 组件名 | 何时使用                                                     |
| :----- | :----------------------------------------------------------- |
| [按钮](./button)   | 按钮用于开启一个闭环的操作任务，如“删除”对象、“购买”商品等。 |
| [菜单](./menu)   | 一系列按钮的集合，主要用于节省界面空间。                     |
| 文字链 | 指向的是一个内部或外部的页面。点击后页面跳转至指向页。       |
