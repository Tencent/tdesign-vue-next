# 消息通知 Notification

轻量级的全局消息提示和确认机制，出现和消失时需要有缓动动画。





### 基础的消息通知

基础消息通知，可手动关闭也可自动退出。

![基础消息通知](https://tdesign.gtimg.com/site/design/images/基础消息通知-1840302.jpg)



### 带图标的消息通知

带图标的消息通知提供两种情况：普通消息通知和重要消息通知（如：系统错误等）。

![带图标的消息通知](https://tdesign.gtimg.com/site/design/images/带图标的消息通知-1840315.jpg)



### 带操作的消息通知

带有操作的消息通知为用户提供下一步行动点，在消息提示框中进行简要快捷的交互。

![组件大小-最多支持三行文字](https://tdesign.gtimg.com/site/design/images/组件大小-最多支持三行文字-1840334.jpg)


![带操作消息通知](https://tdesign.gtimg.com/site/design/images/带操作消息通知-1840346.jpg)


## 组件设计指南


### 何时使用

需要提醒用户来自系统的消息，且不打断用户；

带有解释描述的提醒内容。

### 与页面布局相关

##### 消息通知建议悬浮出现在页面右上角、左下角或右下角，避免对页面主要内容的干扰。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/noti-1@2x.png"/>
    <em>图示：右上角</em>
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/noti-2@2x.png"/>
    <em>图示：左下角</em>
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/noti-3@2x.png"/>
    <em>图示：右下角</em>
  </div>
</div>



### 推荐/慎用示例

##### 当存在多个反馈同时触发时，避免出现多个消息提示互相重叠。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/noti-4@2x.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/noti-5@2x.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />
  </div>
</div>

### 相似组件

| 相似组件                                                     | 何时使用                                                     |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [消息通知](./notification) |需要提醒用户来自系统的消息，且不打断用户；带有解释描述的提醒内容。 |
| [全局提示](./message)| 通常跟随在用户操作之后，对用户的操作作出轻量、即时的反馈；自动消失，不带其他交互操作；反馈内容简短。 |
| [警告](./alert) | 警告常用于承载站内相关产品某项功能的解释说明、使用注意事项等，置于内容展示区域顶部，非悬浮层。 |

