# 分页Pagination

用于模块内切换内容的控件。




### 基础分页

#### 少量页面
最基础的分页控件，仅展示页码。建议使用在内容少于10页的轻量化分页场景。

![少量页面](https://tdesign.gtimg.com/site/design/images/少量页面-1822689.jpg)


#### 页数较多
拥有大量数据需要展示，通过分页能够让用户快速定位当前页码。建议使用在内容超过10页以上的分页场景。

![大量页面](https://tdesign.gtimg.com/site/design/images/大量页面-1822697.jpg)

### 带数据总量显示
关联模块内数据进行展示，以方便用户无需全部浏览即可快速了解数据量级。常用于表格内的数据统计。


![带数据总量显示](https://tdesign.gtimg.com/site/design/images/带数据总量显示-1822709.jpg)



### 带页面展示数量选择的分页
可根据用户需求对每页展示条目数进行调整。

![带页面展示数量选择](https://tdesign.gtimg.com/site/design/images/带页面展示数量选择-1822720.jpg)

### 带快速跳转的分页
当数据有快速定位的需求时，通过选择显示快速跳转的分页。


![带快速跳转](https://tdesign.gtimg.com/site/design/images/带快速跳转-1822739.jpg)

### 极简版分页
极度简单的翻页控件，只展示当前页、总页数及上下翻页。模块内的横向空间较少，并且无需精准定位具体页面的场景。

![极简版](https://tdesign.gtimg.com/site/design/images/极简版-1822748.jpg)

### 迷你版分页
去掉线框的翻页控件，并保留翻页的主要功能。模块内的空间较少，需要轻量化的翻页的场景，以增加页面利用率。

![迷你版](https://tdesign.gtimg.com/site/design/images/迷你版-1822762.jpg)

### 极简迷你版分页
更小尺寸的迷你风格分页控件，适合内嵌在其他组件中分页导航使用。
demo


## 组件设计指南


### 何时使用

当数据内容较多，需要分页展示时；

当数据内容较多，需要分批加载时；

当表格、列表需要在不同页面切换内容时。

### 与页面布局相关

##### 当整页布局时，分页控件一般出现在模块下方，通常居于底部位置。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/pagination-2@2x.png"/>
  </div>

  <div class="item"></div>
</div>


##### 当空间有限时，可使用极简版或迷你版，布局在局部模块内。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/pagination-1@2x.png"/>
  </div>

  <div class="item"></div>
</div>


### 组件搭配使用

##### 可与数据统计提示搭配使用，更好辅助用户了解条目数量。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/pagination-3@2x.png" />
  </div>

  <div class="item"></div>
</div>



