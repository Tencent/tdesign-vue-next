# 表格Table



表格常用于展示同类结构下的多种数据，易于组织、对比和分析等，并可对数据进行搜索、筛选、排序等操作。一般包括表头、数据行和表尾三部分：


### 基础表格
简单表格，使用分页切换数据，最后一列是相关操作。

![基础表格](https://tdesign.gtimg.com/site/design/images/基础表格-1836033.jpg)



### 带边框线、斑马线表格
使用边框线、斑马纹等清晰呈现各数据单元格边界线，辅助信息区隔。

边框线：
![带边框线表格](https://tdesign.gtimg.com/site/design/images/带边框线表格-1836046.jpg)

斑马纹：
![斑马纹](https://tdesign.gtimg.com/site/design/images/斑马纹.png)



### 固定行列表格
在浏览数据时，可以根据实际使用需要将表格表头、列固定，便于信息对照或操作。

固定表头：
![固定表头表格](https://tdesign.gtimg.com/site/design/images/固定表头表格-1836081.jpg)

固定列 - 头部：
![固定列-头部表格](https://tdesign.gtimg.com/site/design/images/固定列-头部表格-1836096.jpg)

固定列 - 尾部：
![固定列-尾部表格](https://tdesign.gtimg.com/site/design/images/固定列-尾部表格-1836105.jpg)

固定列 - 头尾：
![固定列-头尾表格](https://tdesign.gtimg.com/site/design/images/固定列-头尾表格-1836116.jpg)



### 展开收起表格
表格提供可收纳功能，展开后可以进一步查看详细内容，同一时间只能展开一个列表，点击展开列表同时收起其他列表。

![展开收起表格](https://tdesign.gtimg.com/site/design/images/展开收起表格-1836128.jpg)



### 行列合并表格
根据数据结构，可以将表格中的行列进行合并。

![行列合并表格](https://tdesign.gtimg.com/site/design/images/行列合并表格-1836143.jpg)



### 可调整列宽表格
用户对表格中数据纵向列宽有要求，允许自行调整列宽。

![可调整列宽表格](https://tdesign.gtimg.com/site/design/images/可调整列宽表格-1836151.jpg)



### 多级表头表格
表头数据标签可采用多级呈现，表述信息层级包含关系。

![多级表格表头](https://tdesign.gtimg.com/site/design/images/多级表格表头-1836159.jpg)



### 排序表格
对先后顺序有要求的场景（如安全策略场景），提供表格排序能力，用户可以调整位置。



数据行排序：

![可拖动排序表格](https://tdesign.gtimg.com/site/design/images/可拖动排序表格-1836171.jpg)



数据列排序：

![可拖动数据列排序](https://tdesign.gtimg.com/site/design/images/可拖动数据列排序-1836187.jpg)





### 可选择数据行

在涉及到表单选择、或批量操作场景中，可在数据行前直接单选或多选操作对象。

![单选](https://tdesign.gtimg.com/site/design/images/单选-1836203.jpg)

<em>单选</em>


![多选](https://tdesign.gtimg.com/site/design/images/多选-1836213.jpg)

<em>多选</em>


## 组件设计指南


### 何时使用


需展示的信息内容较多，为方便用户浏览和获取批量数据时；

需要对数据进行排序、搜索、筛选、分页等操作时；

需要对数据进行归纳、分类，便于用户快速了解其中的差异与变化、关联和区别时。


### 组件搭配使用

##### 与筛选搭配使用，按一定的数据维度进行筛选。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/table-1.png" />
  </div>

  <div class="item"></div>
</div>

<hr />

##### 与文字提示搭配使用，鼠标hover时呈现说明内容。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/table-2.png" />
  </div>

  <div class="item"></div>
</div>



### 组件常见用法

##### 当单元格显示数据较多时，可最多显示3行，无法显示的内容隐藏，当鼠标hover时显示隐藏内容。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E8%A1%A8%E6%A0%BC------------3@2x.png"/>
    <em>图示：单行截断</em>
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E8%A1%A8%E6%A0%BC---------4@2x.png"/>
    <em>图示：3行限制截断</em>
  </div>
</div>

<hr />

##### 操作列中，空间不足情况下可展示2个高频操作，其余做隐藏处理。也可以选用图标按钮样式，节省一定空间。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/%E8%A1%A8%E6%A0%BC----------5@2x.png"/>
    <em>图示：隐藏部分操作</em>
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/table-6.png"/>
    <em>图示：图标操作</em>
  </div>
</div>
