# 骨架屏 Skeleton

## 组件设计指南

### 何时使用

##### 当页面加载时间较长，需先呈现页面大致结构，用以安抚用户的等待焦虑时。



### 常见用法
##### 在设计骨架屏时，常对信息进行整合归纳处理、或省略部分元素，使界面样式简洁、结构清晰。

<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/guide/skeleton8.png"/>
<em>图示：省略副标题、图标与文字整合</em>

<hr />

### 推荐/慎用示例

##### 当对页面整体应用骨架屏时，为避免用户对“页面刷新”和“数据刷新”产生混淆，不建议将“加载组件”和“骨架屏组件”混合使用。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/guide/skeleton9.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/guide/skeleton10.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />
  </div>
</div>
<hr />


##### 骨架屏的布局应与实际页面结构一致，达到预览页面结构的作用，不建议不同页面复用同一结构的骨架屏。


<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/guide/skeleton11.png" />
<img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />

<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/guide/skeleton12.png" />
<img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />



<hr />


### 相似组件

| 组件名 | 何时使用                             |
| :----- | :----------------------------------- |
| [骨架屏](./skeleton) | 当内容加载时间较长时，在内容加载完成之前对结构有大致的呈现。 |
| [加 载](./loading)   | 当页面局部或全部处于数据处理当等待中，需要让用户清晰感知到当前状态时。|
