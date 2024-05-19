# 图片 Image

## 组件设计指南

### 何时使用

当需要对图像内容进行陈列、展示，以便用户快速了解图像信息时。

### 与布局相关

##### 多张图片组合展示时，需要更准确的遵循栅格系统，使整体页面布局规范协调。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/guide/image1.png" />
    <em>图示：同样大小的图片在栅格系统中</em>
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/guide/image2.png" />
    <em>图示：不同大小的图片在栅格系统中</em>
  </div>
</div>


<hr />

### 组件搭配使用
##### 图片与分页搭配使用，当图片过多、需在每页固定展示一定数量时，可让用户自主选择页数查找图片。
<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/guide/image3.png" />
    <em></em>
  </div>
</div>

##### 图片与分步加载搭配使用，可形成图片瀑布流，浏览大量图片时能减少用户操作、提供沉浸式体验。
<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/guide/image4.png" />
    <em></em>
  </div>
</div>

### 推荐/慎用示例


##### 当图片仅为展示，不具备预览功能时，应避免图片尺寸过小，从而影响图像信息的浏览和获取。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/guide/image5.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/guide/image6.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />
  </div>
</div>

<hr />

##### 当同一页面中图片尺寸不同时，建议统一宽度，遵循栅格规范使图片垂直间距保持一致，避免间距大小参差不齐，影响页面的规整和秩序。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/guide/image7.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/guide/image8.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />
  </div>
</div>

<hr />

### 相似组件

| 组件名 | 何时使用                             |
| :----- | :----------------------------------- |
| [图   片](./image) | 当需要对图像内容进行陈列、展示，以便用户快速了解图像信息时。 |
| [图片预览](./imageveiwer)   | 当需要对已展示的图片，进行快速查看、或进行具有放大、缩小等操作的浏览行为时。|
