# Layout 布局

用于组织网页的框架结构。



### 侧边导航布局

主要包含侧边导航、内容区域。该布局下，页面间切换的操作效率较高，但压缩了内容区域的横向空间。适用于导航层级较深，导航效率要求较高的页面。


### 顶部导航布局

主要包含顶部区域、内容区域。该布局下，横向空间的展示效率很高，但损失了导航空间，降低了页面导航的切换效率。适用于主要操作区域在内容区域，对页面叠好效率要求不高的页面。对于该类页面，为了保证信息布局的稳定性，内容区域的宽度常设置为固定宽度。


### 组合导航布局

主要包含顶部导航、侧边导航、内容区域。顶部导航和侧边导航的组合使用，提升了导航效率。多用于信息架构复杂、对导航效率有一定要求的应用型网站。




## 组件设计指南


### 何时使用

布局用于页面区域划分，稳定地呈现相对应的内容。
页面布局通常划分为：内容区域（Content）、顶部区域（Header）、侧边区域（Sider）、和底部区域（Footer）。

### 与页面布局相关

#### 画板尺寸

为了减少布局设定时的沟通与拆分计算成本，基于主流屏幕尺寸，通常将标准画板宽度定为 1440px 或 1920px。

#### 布局的规律

为了页面布局的一致性，在不同区域中放置内容元素时，应当保持间距的规律性。在TDesign中使用一组具有韵律的间距值，在遵循 8 倍数原则的基础上，增加了 4、12 两档小间距，以灵活满足不同的应用场景。

<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/11.png?111" />

### 常见用法

#### 固定布局

当顶部需要承载重要功能时，可以将顶部区域、底部区域固定。当内容区域过高时，可以将侧边区域固定。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/Layout_2.png" />
    <em>图示：顶部固定</em>
  </div>
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/Layout_3.png" />
    <em>图示：底部固定</em>
  </div>
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/Layout_4.png" />
    <em>图示：侧边固定</em>
  </div>
</div>

#### 响应式布局
为了更好地适配各种尺寸的显示设备可以使用响应式布局，通过设置断点实现布局的切换。当浏览器宽度小于配置的断点值时，侧边区域的导航自动从展开态变为收起态。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/Layout_5.png?5555" />
  </div>
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/Layout_666.png?111111" />
  </div>
</div>

### 推荐/慎用示例


##### 为了保证内容区域不被过度拉伸，应注意限定其最大宽度，取值可根据实际情况决定。TDesign中标准画板宽度为1440px，左侧菜单栏为232px，其内容区域为1208px；为了保证主流屏幕分辨率1920px * 1080px下的展示效果，建议内容区域最大宽度为1688px。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/Layout_7.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/Layout_8.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />
  </div>
</div>



##### 当需要兼顾带鱼屏等超宽屏幕时，对于包含左侧导航的网页，可以考虑采用内容区域左对齐的方式，以避免左侧导航与内容区域间的距离过大，提升切换效率。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/Layout_9.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/Layout_10.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />
  </div>
</div>

<hr />

更多布局设计可参考： [全局样式-Layout布局](/design/layout)
