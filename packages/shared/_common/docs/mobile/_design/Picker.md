# 选择器 Picker

## 组件设计指南

### 何时使用

当需要在有限的空间展示大量选项供用户选择，或者一组选项由递进层级构成需要用户逐级选择时使用。

### 推荐/慎用示例

##### 选择器若为一组有层级关系的选项时，选项层级不宜超过4层，层级过多时应调整数据结构或改用其他交互方式。

<div class="legend">
  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/mobile-guide/picker/picker-1.png" />
    <img class="tag" src="https://tdesign.gtimg.com/site/doc/bad.png" />
  </div>
</div>

<hr />

##### 选择器若为一组有层级关系的选项时，各层级选项的归属关系应具备逻辑相关性，数据层级由大到小，避免归属关系混乱。

<div class="legend">
  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/mobile-guide/picker/picker-2.png" />
    <img class="tag" src="https://tdesign.gtimg.com/site/doc/good.png" />
  </div>

  <div class="item">
    <img src="https://tdesign.gtimg.com/site/design/mobile-guide/picker/picker-3.png" />
    <img class="tag" src="https://tdesign.gtimg.com/site/doc/bad.png" />
  </div>
</div>


### 相似组件

| 组件名                            | 何时使用                                                                 |
| :-------------------------------- | :----------------------------------------------------------------------- |
| [时间选择器](./date-time-picker ) | 在表单中需要输入单个日期或时间时使用。                                   |
| [级联选择器](./Cascader)          | 当一组选项由递进层级构成，且每个层级有大量的选项需要用户逐级选择时使用。 |
