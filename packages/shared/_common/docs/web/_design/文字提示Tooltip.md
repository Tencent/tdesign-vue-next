# Tooltip 文字提示

             

用于文字提示的气泡框。




### 带箭头的文字提示

带箭头的文字提示有较明确的指向性。常用于有多个需要提示的信息并列放置时，对某个具体信息进行提示。

demo

### 不带箭头的文字提示

不带箭头的文字提示没有明确指向性。常用于不需要针对性提示的场景中。 

demo



### 带主题色的文字提示
demo

### 不同触发方式的文字提示
demo

## 组件设计指南


### 何时使用

无需常驻展示，需要鼠标移入来展示文字解释说明时。

### 组件搭配使用


##### 与超链接搭配，可点击超链接从文字提示跳转到对应链接的页面。
<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/tooltip-2.png"/>
  </div>
  
  <div class="item">
  </div>
</div>



### 组件常见用法

##### 在表单中使用时，通常位于填写项标题后方。
<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/tooltip-3.png"/>
  </div>

  <div class="item">
  </div>
</div>

<hr />

##### 当有字段需要解释说明时，通常位于字段后方。
<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/tooltip-4.png"/>
  </div>

  <div class="item">
  </div>
</div>

<hr />

##### 当文案过长无法完整显示时，通常用于补充显示完整文案。
<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/tooltip-5.png"/>
  </div>

  <div class="item">
  </div>
</div>



### 推荐/慎用示例
##### 文字提示信息不宜过多，一般不超过三行。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E6%96%87%E5%AD%97%E6%8F%90%E9%86%92----------6@2x.png"/>
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E6%96%87%E5%AD%97%E6%8F%90%E9%86%92----------7@2x.png"/>
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />
  </div>
</div>


### 相似组件


| 组件名 | 何时使用                                                                       |
| :----- | :----------------------------------------------------------------------------- |
| [文字提示](./tooltip)  | 鼠标移入需要展示文字解释说明时。 |
| [气泡确认框](./popconfirm) | 需要用户进行二次确认、需要给用户展示反馈信息时；不会造成严重后果的二次确认场景时。 |
