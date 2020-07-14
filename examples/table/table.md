## Table 表格

::: demo demos/base 默认
:::

::: demo demos/multi-header 多级表头
:::

::: demo demos/fixed-header 固定表头
:::

::: demo demos/fixed-column 固定列
:::

::: demo demos/custom-cell 自定义单元格
:::

::: demo demos/empty 空表格
:::

::: demo demos/multi-header 多级表头
:::

::: demo demos/expand 可展开
:::

::: demo demos/select-single 单选
:::

::: demo demos/select-multiple 多选
:::

::: demo demos/sort 排序
:::

::: demo demos/async-loading 异步加载
:::

::: demo demos/loading loading
:::

::: demo demos/filter-uncontrolled 非受控筛选
:::

::: demo demos/filter-controlled 受控筛选
:::

### 属性配置

| 属性    | 类型                             | 默认值 | 必传 | 说明 |
| ------- | -------------------------------- | ------ | ---- | ---- |
| loading | Boolean / Function(props): VNode | false  | N    |      |

### Column

列描述数据对象，是 columns 中的一项

| 属性       | 类型    | 默认值 | 必传 | 说明                          |
| ---------- | ------- | ------ | ---- | ----------------------------- |
| attrs      | Object  | -      | N    | 列的原生属性配置              |
| type       | String  | -      | N    | 多选/单选，multiple or single |
| checkProps | Object  | -      | N    | 选择框的属性配置              |
| disabled   | Boolean | -      | N    | 是否禁用选项框                |

### Expand

展开功能相关属性
| 属性 | 类型 | 默认值 | 必传 | 说明 |
| ---- | -------------------------------- | ------ | ---- | ---- |
| expandedRowKeys | Array | - | N | 展开的行，控制属性 |
| expandedRowRender | Function({ record, index }): VNode | - | N | 额外的展开行渲染函数 |

### Selection

选择功能相关属性
| 属性 | 类型 | 默认值 | 必传 | 说明 |
| ---- | -------------------------------- | ------ | ---- | ---- |
| selectedRowKeys | Array | - | N | 选中的行，控制属性 |
