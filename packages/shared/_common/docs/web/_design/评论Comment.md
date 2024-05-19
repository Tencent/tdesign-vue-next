# 评论 Comment


### 基础评论
评论最基本的组件，包括作者、头像、时间、评论内容；适用于各种需要进行评论展示的场景；

demo

### 带回复评论
适用于对于评论的回复列表的展示；第一级回复进行缩进展示，对回复的再次回复不再进行缩进展示，在作者名称后标明回复对象的名称即可。

demo

### 带引用评论
适用于表示评论和其他内容的引用关系；

demo

### 带操作评论
可对评论内容进行相关操作的组件，适用于主态和客态时需要自定义操作的场景；

demo

### 带链接评论
评论中包含网址链接的组件。当评论中添加了网址链接时进行自动识别，点击链接可支持跳转。

demo


## 组件设计指南

### 何时使用
当页面需要提供用户对内容的反馈、评价、讨论时。


### 与布局相关


#### 布局一般位于所讨论内容的下方，可根据需要选择通栏、非通栏不同布局。


<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/Comment_1.png" />
    <em>图示：评论通栏布局</em>
  </div>
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/Comment_2.png" />
    <em>图示：评论非通栏布局</em>
  </div>

</div>

<hr />




### 与组件搭配使用


##### 与抽屉搭配使用。在用户需要沉浸阅读等必要场景时，可使用抽屉承载评论内容。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/Comment_3.png" />
    <em></em>
  </div>

</div>

<hr />




##### 与加载Loading组合使用，当评论条数较多时，按一定数量逐步加载显示，提高用户阅读信息的效率和准确性。


<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/Comment_4.png" />
    <em>图示：基础评论与加载搭配</em>
  </div>
    <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/Comment_5.png" />
    <em>图示：带回复的评论与加载搭配</em>
  </div>

</div>

<hr />



