# 公告栏 NoticeBar

## 组件设计指南

### 何时使用

当需要对用户进行较明显的反馈或提示，需要用户关注时使用，一段时间后不会自动消失，通常是自动触发

### 页面布局相关

##### 公告栏位于页面或模块的顶部，让用户能够快速关注到重要信息

<div class="legend">
  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/mobile-guide/notice-bar/notice-bar-1.png" />
  </div>

  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/mobile-guide/notice-bar/notice-bar-2.png" />
  </div>
</div>


### 常见用法

##### 经常用于系统状态的通知，如警示或错误信息的展示，告知用户具体的系统状态、出现原因、和解决方式

<div class="legend">
  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/mobile-guide/notice-bar/notice-bar-3.png" />
  </div>
</div>

<hr />

##### 展示当前场景的重要公告，这类公告通常比较重要，需要用户务必关注

<div class="legend">
  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/mobile-guide/notice-bar/notice-bar-4.gif" />
  </div>
</div>

<hr />

##### 在营销场景，经常用于广告或促销信息的展示，提高用户转化率

<div class="legend">
  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/mobile-guide/notice-bar/notice-bar-5.png" />
  </div>
</div>

<hr />

##### 当需要同时展示多条公告时，通常使用可滚动的公告栏，依次展示多条公告信息

<div class="legend">
  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/mobile-guide/notice-bar/notice-bar-6.gif" />
  </div>
</div>


### 推荐/慎用示例

##### 可以同时展示多个公告栏，但不建议超过2个，过多的公告栏会占用过多屏幕空间、分散用户的注意力

<div class="legend">
  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/mobile-guide/notice-bar/notice-bar-7.png" />
    <img class="tag" src="https://tdesign.gtimg.com/site/doc/bad.png" />
  </div>
</div>


### 相似组件

| 组件名                | 何时使用                                                                                   |
| :-------------------- | :----------------------------------------------------------------------------------------- |
| [消息通知](./message) | 当需要对用户进行较轻量的反馈或提示，可以自动消失或通过点击关闭，通常由用户触发。           |
| [轻提示](./toast)     | 当需要对用户进行轻量反馈或提示，且不需要用户进行操作时使用，轻提示会在一段时间后自动消失。 |

