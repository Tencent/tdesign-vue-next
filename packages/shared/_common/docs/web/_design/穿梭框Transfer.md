# Transfer 穿梭框

以直观的方式在两栏中移动选项元素，是对选项进行单个或批量移动从而完成挑选的数据容器。左栏是“源”，右边是“目标”。




### 基础穿梭框
包含穿梭框最基础的功能和组合元素。需要两框之间的元素迁移时，便于元素的选择。

demo



## 组件设计指南

### 何时使用

一组数据进行两种状态的分类时；

总类和子类的选项筛选时。

### 组件搭配使用

##### 与搜索框搭配使用，可在数据量较大时，提供快捷的检索能力。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/20211221145522.png" />
  </div>

  <div class="item"></div>
</div>


##### 与树结构搭配搭配使用，可在选项数据有父子层级结构时，提供更清晰的选择能力。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/20211221145634.png" />
  </div>

  <div class="item"></div>
</div>



### 常见用法

##### 单个选项内容过多时，每个选项内容折行显示。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/20211221145649.png" />
  </div>

  <div class="item"></div>
</div>


##### 选项数据内容过多时，保持当前页列表数量为最大可显示数量。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/20211221145922.png" />
  </div>

  <div class="item"></div>
</div>


##### 需要明确展示“源”数据数量变化时，可使用不保留选项的互动形式。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/20211221150447.png" />
  </div>

  <div class="item"></div>
</div>


##### 需要始终展示“源”数据时，可使用保留选项的互动形式。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/20211221150049.png" />
  </div>

  <div class="item"></div>
</div>



### 相似组件

| 组件名 | 何时使用                                                                       |
| :----- | :----------------------------------------------------------------------------- |
| [穿梭框](./transfer)  | 一组数据进行两种状态的分类时；总类和子类的选项筛选时。 |
| [树](./tree) | 用于承载有父子关系的结构化内容，提供内容层级的展示。                |
