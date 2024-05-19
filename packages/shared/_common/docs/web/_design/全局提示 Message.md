# 全局提示 Message
对用户的操作作出轻量的全局反馈。




### 普通全局提示
使用简洁文字描述操作反馈。常规全局提示包含：普通信息、成功信息、警示信息、错误信息、帮助信息和loading。

#### 普通信息提示
![普通信息](https://tdesign.gtimg.com/site/design/images/普通信息.jpg)

#### 成功信息提示
![成功信息](https://tdesign.gtimg.com/site/design/images/成功信息.jpg)

#### 警示信息提示
![警示信息](https://tdesign.gtimg.com/site/design/images/警示信息.jpg)

#### 错误信息提示
![错误信息](https://tdesign.gtimg.com/site/design/images/错误信息.jpg)

#### 帮助信息提示
![帮助信息](https://tdesign.gtimg.com/site/design/images/帮助信息.jpg)

#### loading信息提示
![修改002](https://tdesign.gtimg.com/site/design/images/修改002.png)



### 带操作全局提示
提示内容后，提供用户附带的操作，如关闭、撤销、详情等。



## 组件设计指南


### 何时使用

在完成某个独立页面后，需要反馈时；

在某个操作区域或系列操作完成后，需要总体反馈时。


### 与页面布局相关

##### 全局提示常出现在页面顶部居中、内容区右上方和左下方等位置，提示用户却不过于干扰

<div class="legend">
  <div class="item">
  <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/message-1.png"/>
    <em>图示：上方居中</em>
  </div>

  <div class="item">
   <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/message-2.png"/>
    <em>图示：右上角</em>
  </div>

  <div class="item">
  <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/message-3.png"/>
    <em>图示：左下角</em>
  </div>
</div>

### 相似组件

| 相似组件             | 何时使用                                                     |
| :------------------- | :----------------------------------------------------------- |
| [全局提示](./message)| 对用户的操作作出轻量的全局反馈。 |
| [警告](./Alert)  | 警告常用于承载站内相关产品某项功能的解释说明、使用注意事项等，置于内容展示区域顶部，非悬浮层。 |
| [消息通知](./Notification) | 需要提醒用户来自系统的消息，且不打断用户时；带有解释描述的提醒内容时。 |


