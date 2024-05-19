# Drawer 抽屉

抽屉常通过单击临近的按钮控件打开，从屏幕边缘滑入的浮层面板，又称半屏弹窗。




### 可查看的抽屉

在抽屉中承载展示性的信息内容。当内容无法在当前页面全部呈现，或需要频繁点击页面相关参数实时查看或对比时，可用抽屉增大页面扩展性。

### 可操作的抽屉

操作类抽屉在抽屉中承载需要编辑或操作的表单，可在用户需要进行操作来补充父页面内容时使用。


demo

### 不显示蒙层的抽屉（非模态抽屉）
demo

### 不同位置的抽屉

#### 右侧抽屉（最常用）

抽屉从右侧向左侧滑出。

demo

#### 左侧抽屉

抽屉从左侧向右侧滑出。

demo

#### 顶部抽屉

抽屉从顶部向底部滑出。

demo

#### 底部抽屉

抽屉从底部向顶部滑出。

demo

### 不同尺寸的抽屉
可以自定义控制抽屉展示宽度。
demo

### 弹出模式抽屉
支持覆盖及推开内容区域的方式展示抽屉。
demo

### 渲染和呈现在当前父元素的抽屉
指定抽屉出现的父级容器。

demo


## 组件设计指南


### 何时使用

当需要一个附加的面板来对页面内容做补充说明时；

当需要在当前任务流中插入临时操作任务时。

### 与页面布局相关

##### 整体界面布局，抽屉在整个页面出现

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E6%8A%BD%E5%B1%89------------1@2x.png" />
  </div>

  <div class="item"></div>
</div>

<hr />

局部区域布局，抽屉仅在当前操作的区域内出现，而不会覆盖整个页面

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E6%8A%BD%E5%B1%89------------2@2x.png" />
  </div>

  <div class="item"></div>
</div>


### 推荐/慎用示例

##### 避免抽屉面积过大，造成覆盖页面较多、无法看到页面的关键信息

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E6%8A%BD%E5%B1%89----------3@2x.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E6%8A%BD%E5%B1%89----------4@2x.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />
  </div>
</div>

### 相似组件

| 组件名 | 何时使用                                                                                |
| :----- | :-------------------------------------------------------------------------------------- |
| [抽屉](./drawer)  | 当需要一个附加的面板来对页面内容做补充说明时；当需要在当前任务流中插入临时操作任务时。  |
| [对话框](./dialog) | 需要对用户进行阻断式提示时。                                                            |

