# 步骤条Steps

提示用户进度以及当前的步骤，用于引导用户按照步骤完成任务的导航条。




### 水平步骤条
以水平方向引导用户使用的步骤条。

#### 带序号的水平步骤条
适用于步骤数较多时，让用户更明确的了解步骤数量。

![水平步骤条——带序号](https://tdesign.gtimg.com/site/design/images/水平步骤条——带序号-1820011.jpg)

#### 不带序的水平步骤条

适用于步骤数较少时，主要引导用户按步骤完成操作。

![水平步骤条——不带序号](https://tdesign.gtimg.com/site/design/images/水平步骤条——不带序号-1820023.jpg)

### 垂直步骤条
垂直方向排列的步骤条，常用于竖排布局或窄屏场景。
#### 不带序号的垂直步骤条
适用于垂直步骤较少的情况。
![垂直步骤条——不带序号](https://tdesign.gtimg.com/site/design/images/垂直步骤条——不带序号-1820057.jpg)

#### 带序号的垂直步骤条
适用于步骤较多、步骤提示内容较长的场景。
![垂直步骤条——带序号](https://tdesign.gtimg.com/site/design/images/垂直步骤条——带序号-1820047.jpg)


### 带状态的步骤条
在步骤中，包含“已完成、进行中、未完成”三种状态的步骤条
demo


## 组件设计指南


### 何时使用

数据内容需要分步骤显示，通过步骤让用户对整个流程有所预期时；

任务无法一次完成，需要呈现任务进度以及当前步骤时。

### 与页面布局相关


##### 步骤条在页面使用中，一般位于页面或内容模块的上方、下方或左侧位置。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/20211221142854.png"/>
    <em>图示：位于页面上方</em>
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/steps-2@2x.png"/>
    <em>图示：位于页面下方</em>
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/steps-3@2x.png"/>
    <em>图示：位于页面左侧</em>
  </div>
</div>

### 组件常见用法

##### 水平步骤条应从左到右依次展示步骤流程，垂直步骤条可按需选择顺序（从上往下）或者倒序（从下往上）展示步骤流程。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/steps-4@2x.png"/>
    <em>图示：正序</em>
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/steps-5@2x.png"/>
    <em>图示：倒序</em>
  </div>
</div>

<hr />

##### 常见的完整流程包含3种步骤：已完成、进行中、未完成。

<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E6%AD%A5%E9%AA%A4%E6%9D%A1--5@2x.png"/>

<hr />

##### 在当前流程出现失败或告警状态时，对应步骤条标题和图标可变为红色或橙色，起到突出提示的作用。

<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E6%AD%A5%E9%AA%A4%E6%9D%A1----6@2x.png"/>


### 推荐/慎用示例

##### 当页面、模块宽度有限或步骤数较多时，不建议使用横向滚动条，可精简步骤数或考虑选用垂直步骤条。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/steps-8@2x.png"/>
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/steps-9@2x.png"/>
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />
  </div>
</div>
