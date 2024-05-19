# Progress 进度条

展示操作的当前进度。




### 线形进度条

以线形表示进度的组件，线形外可选择性地配有文字或图标补充显示进度和状态。多用于信息量较为丰富的情况。

<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E8%BF%9B%E5%BA%A6%E6%9D%A11.1.png"/>

### 环形进度条

以线形表示进度的组件，环内可选择性地配有文字或图标补充显示进度和状态。多用于需要强调进度百分比的情况。

<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E8%BF%9B%E5%BA%A6%E6%9D%A11.2.png"/>



## 组件设计指南


### 何时使用

当某操作需要较长时间才能完成（可能超过 4 秒），需要给用户完成任务的明确预期时；

当某操作在后台运行，需要显示该操作的实时进度时；


### 与页面布局相关

##### 展示整个页面加载进度时，通常进度条放置在页面正中间。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E8%BF%9B%E5%BA%A6%E6%9D%A1-1@2x.png" />
    <em>图示：环形进度条在页面居中</em>
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E8%BF%9B%E5%BA%A6%E6%9D%A1-%E7%BA%BF%E6%80%A71@2x.png" />
    <em>图示：线形进度条在页面居中</em>
  </div>
</div>

<hr />

##### 展示页面局部数据变化进度时，进度条组件放置在对应局部区块内。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E8%BF%9B%E5%BA%A6%E6%9D%A1-2@2x.png" />
    <em>图示：环形进度条在局部居中</em>
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E8%BF%9B%E5%BA%A6%E6%9D%A1-%E7%BA%BF%E6%80%A72@2x.png" />
    <em>图示：线形进度条在局部居中</em>
  </div>
</div>


### 相似组件

| 组件名 | 何时使用                                                               |
| :----- | :--------------------------------------------------------------------- |
| [进度条](./progress) | 页面局部或全局处于等待数据加载时，使用加载中让用户清晰感知到当前状态。 |
| [滑 块](./slider)  | 在数值输入过程中，需要提供实时的视觉比例反馈时。                       |


