# 警告 Alert

警告条用于承载需要用户注意的信息。





### 基础警告

警告条包含四种情况的提示：成功，消息，警示，失败。

![带图标的警告](https://tdesign.gtimg.com/site/design/images/带图标的警告-1837894.jpg)



### 带操作的警告 
当需要对警告进行操作时，可设置操作项。

![带关闭操作](https://tdesign.gtimg.com/site/design/images/带关闭操作-1837902.jpg)

![可自定义关闭操作](https://tdesign.gtimg.com/site/design/images/可自定义关闭操作-1837910.jpg)

![带相关操作](https://tdesign.gtimg.com/site/design/images/带相关操作-1837917.jpg)



### 带相关描述文字的警告

当信息内容较复杂时，可使用相关描述文字辅助说明。

![带相关描述文字的警告](https://tdesign.gtimg.com/site/design/images/带相关描述文字的警告-1837929.jpg)



### 折叠的警告 

当信息内容超过2行时，可使用折叠的方式将部分信息隐藏。

![带折叠的警告](https://tdesign.gtimg.com/site/design/images/带折叠的警告-1837936.jpg)



### 轮播的警告

当一个页面中需要使用多条警告时，可使用轮播的方式逐条展示信息；

![](https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/20210524151939.png)





## 组件设计指南



### 何时使用

当有重要的提示信息，需要引起用户关注时。

### 与页面布局相关

##### 常布局在页面全局顶部、对应内容区顶部或对话框内容区。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/alert-1@2x.png"/>
    <em>图示：站点顶部</em>
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/alert-2@2x.png"/>
    <em>图示：内容顶部</em>
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/alert-3@2x.png"/>
    <em>图示：对话框内容区</em>
  </div>
</div>


### 推荐/慎用示例

##### 当页面中需要多条警告时，建议使用轮播的告警。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/alert-4@2x.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/alert-5@2x.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />
  </div>
</div>

<hr />



##### 应清晰表述警示内容，避免模糊不清。

<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E8%AD%A6%E5%91%8A----4@2x.png" />
<img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
 
<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E8%AD%A6%E5%91%8A----5@2x.png" />
<img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />


<hr />

### 相似组件

| 相似组件                 | 何时使用                                                     |
| :----------------------- | :----------------------------------------------------------- |
| [警告](./Alert) | 用于承载需要用户注意的信息。 |
| [消息通知](./Notification) | 需要提醒用户来自系统的消息，且不打断用户；带有解释描述的提醒内容；需要用户进行相关交互时。 |
| [全局提示](./Message)      | 在完结某个独立页面后的反馈；在一个操作区域或一系列操作完成之后的总体反馈；在某个操作点之后的反馈。 |

