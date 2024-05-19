# 上传 Upload

上传组件允许用户传输文件或提交自己的内容。
### 基础上传

![基础控件](https://tdesign.gtimg.com/site/design/images/基础控件-1848714.jpg)

![带有文字说明](https://tdesign.gtimg.com/site/design/images/带有文字说明-1848722.jpg)

### 拖拽上传
支持拖拽文件到指定区域触发上传。

![拖拽上传](https://tdesign.gtimg.com/site/design/images/拖拽上传-1848736.jpg)

### 图片上传

![图片上传](https://tdesign.gtimg.com/site/design/images/图片上传-1848750.jpg)

### 批量上传
批量上传通常作为一个单独的功能出现，上传的内容用表格来承载。由于批量上传需要的时间较长，某些场景下会出现先选择文件，确认后再统一上传的场景。

#### 批量上传文件
![批量上传](https://tdesign.gtimg.com/site/design/images/批量上传-1848761.jpg)

![批量上传中](https://tdesign.gtimg.com/site/design/images/批量上传中-1848782.jpg)

#### 批量上传图片

![批量上传图片](https://tdesign.gtimg.com/site/design/images/批量上传图片-1848803.jpg)

![批量上传图片中](https://tdesign.gtimg.com/site/design/images/批量上传图片中-1848814.jpg)

## 组件设计指南


### 何时使用

需要对文件进行导入或上传时。

### 常见用法

##### 上传组件需要呈现清晰的使用状态，包含初始状态、拖拽状态、上传过程、上传成功和上传失败等。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E4%B8%8A%E4%BC%A01@2x.png"/>
     <em>图示：初始状态</em>
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E4%B8%8A%E4%BC%A0-2@2x.png"/>
    <em>图示：拖拽状态</em>
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E4%B8%8A%E4%BC%A0-3@2x.png"/>
    <em>图示：上传过程</em>
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E4%B8%8A%E4%BC%A0-4@2x.png"/>
    <em>图示：上传成功</em>
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/upload-5@2x.png"/>
    <em>图示：上传失败</em>
  </div>
</div>
