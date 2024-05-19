# 水印 Watermark

## 组件设计指南

### 何时使用

当需要对文本、图片或页面等进行版权说明、所属权标识或防盗用时使用。



### 与布局相关

##### 在布局时，水印以页面内容在页面中的空间分层为参照。需要遮挡内容时，位于内容顶层；需要全部展示内容时，位于内容底层。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/guide/w1.png" />
    <em>图示：位于内容顶层</em>
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/guide/w2.png" />
    <em>图示：位于内容底层</em>
  </div>
</div>


<hr />

### 常见用法
##### 静态水印，一般多个组合平铺使用。常用在整个页面元素均较为重要、不希望被局部截取的场景，如文章、证件、会话窗口等。
<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/guide/w3.png" />
    <em></em>
  </div>
</div>

##### 动态水印可在页面游走移动，一般独立使用。常用在不便过多干扰、但需要进行标识的场景，如图片、视频等。
<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/guide/w4.png" />
    <em></em>
  </div>
</div>

### 推荐/慎用示例


##### 水印会对页面内容有一定干扰，为保持页面的规范性和可读性，应避免在同一区域使用多种不同的水印样式。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/guide/w5.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/guide/w6.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />
  </div>
</div>

<hr />
