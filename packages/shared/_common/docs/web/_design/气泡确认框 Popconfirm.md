# 气泡确认框 Popconfirm

气泡确认框通常用于不会造成严重后果的二次确认场景，其会在点击元素上弹出浮层进行提示确认。气泡确认框没有蒙层，点击确认框以外的区域即可关闭。







### 基础气泡确认框
使用最基础的说明文字及操作按钮等对较简单的操作进行二次确认。

![基础气泡确认框](https://tdesign.gtimg.com/site/design/images/基础气泡确认框-1838371.jpg)



### 带图标的气泡确认框
在说明文字之前增加图标，如普通、警示及告警等图标，增强表达以更好引起用户注意。

![带图标的气泡确认框](https://tdesign.gtimg.com/site/design/images/带图标的气泡确认框-1838381.jpg)



### 带描述的气泡确认框

在主要说明文字之外增加了操作相关的详细描述，对较复杂的，可能造成疑惑的操作进行详细描述。

![带描述的气泡确认框](https://tdesign.gtimg.com/site/design/images/带描述的气泡确认框-1838389.jpg)




## 组件设计指南




### 何时使用

需要用户进行二次确认时；

需要给用户展示反馈信息时。


### 与页面布局相关

##### 气泡确认框可根据页面需要，进行各方向的自由布局，出现位置应避免遮挡页面信息、或被遮挡。
<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/pop-1@2x.png"/>
    <em>图示：右侧空间不足时，出现在左侧，避免起泡确认框被右侧边缘遮挡</em>
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/pop-2@2x.png"/>
    <em>图示：有相关信息需要展示时，可出现在无关信息的一侧，避免相关信息被遮挡。</em>

  </div>
</div>




### 组件搭配使用

##### 与全局提示搭配使用，在操作后用来给予用户操作结果反馈。


<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/pop-3@2x.png" />


### 推荐/慎用示例

##### 主要说明文字需明确表达其目的及操作的后果。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/pop-4@2x.png"/>
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/pop-5@2x.png"/>
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />
  </div>
</div>

<hr />

##### 按钮需使用可指引后果的操作词汇，而不是模棱两可的词汇。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/pop-6@2x.png"/>
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/pop-7@2x.png"/>
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />
  </div>
</div>

### 相似组件

| 相似组件                                                     | 何时使用                                                     |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [气泡确认框](./popconfirm) |气泡确认框通常用于不会造成严重后果的二次确认场景，其会在点击元素上弹出浮层进行提示确认。 |
| [对话框](./dialog) | 对话框是一种临时窗口，通常在不想中断整体任务流程，但又需要为用户展示信息或获得用户响应时，在页面中打开一个对话框承载相应的信息及操作。 |