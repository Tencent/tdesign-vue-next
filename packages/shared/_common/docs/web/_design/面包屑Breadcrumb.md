# 面包屑Breadcrumb
显示当前页面在系统层级结构的位置，并能返回之前任意层级的页面。





### 基础面包屑
适用于广泛的基础用法，系统拥有超过两级以上的层级结构，用于切换向上任意层级的内容。

![基础面包屑](https://tdesign.gtimg.com/site/design/images/基础面包屑-1818754.jpg)

### 带图标的面包屑
可自定义每项内容，统一图标加文字，图标放在文字前面。

![带图标的面包屑](https://tdesign.gtimg.com/site/design/images/带图标的面包屑-1818866.jpg)

### 自定义分隔符的面包屑
通过 separator 的属性来自定义分隔符，建议用图标而非文本符号。

![自定义分隔符的面包屑](https://tdesign.gtimg.com/site/design/images/自定义分隔符的面包屑-1818826.jpg)

### 带下拉的面包屑
面包屑支持下拉菜单，带下拉的面包屑分隔符建议避免使用 “ > ”。

![带下拉的面包屑](https://tdesign.gtimg.com/site/design/images/带下拉的面包屑-1818849.jpg)

## 组件设计指南


### 何时使用

当系统超过两级以上层级结构；

当系统需要让用户了解自己所处位置时；

当需要有返回上一层级导航功能时。

### 组件常见用法

##### 面包屑中文案过长时，可缩略显示，鼠标hover时显示全部。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/20211102115411.png" />
  </div>

  <div class="item">
  </div>
</div>


### 推荐/慎用示例

##### 面包屑为辅助导航，应避免过于强调导致成为页面视觉焦点。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/20211102115359.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/20211102115326.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />
  </div>
</div>
