## Table 表格

表格常用于展示同类结构下的多种数据，易于组织、对比和分析等，并可对数据进行搜索、筛选、排序等操作。

一般包括表头、数据行和表尾三部分：<br>

表头：归类并标示数据的类型，并针对具体内容提供多选、筛选、排序或搜索等操作；

数据行：承载结构化数据，每一个数据占据一行单元格；

表尾：常承载分页、数值统计等；


### 何时使用
1. 需要组织、展示大批量数据时
可以使用表格对数据进行组织，易于用户浏览和获取，特别是展示大量信息内容的时候；

2. 需要对数据进行多种复杂操作时
可以使用表格对数据进行排序、搜索、筛选、分页等操作；

3. 需要对数据进行对比分析时
可以使用表格对数据进行归纳、分类，便于用户快速查询其中的差异与变化、关联和区别；

## 1.组件类型

### 1.1 基础文字列表

::: demo demos/base
:::

### 1.2 固定表头

在浏览数据时，可以根据实际使用需要将表格表头、列固定，便于信息对照或操作。

<font color=#7A869A>固定表头：</font>

::: demo demos/fixed-header 
:::

<font color=#7A869A>固定列：</font>


::: demo demos/fixed-column 
:::

### 1.3 自定义单元格


::: demo demos/custom-cell 
:::

### 1.4 空表格

使用默认空表格样式

::: demo demos/empty 
:::

### 1.5 多级表头

表头数据标签可采用多级呈现，表述信息层级包含关系。

::: demo demos/multi-header 
:::

### 1.6 可展开

表格提供可收纳功能，展开后可以进一步查看详细内容，同一时间只能展开一个列表，点击展开列表同时收起其他列表。

::: demo demos/expand 
:::


### 1.7 可拖动排序表格
对先后顺序有要求的场景（如安全策略场景），提供表格排序能力，用户可以拖动数据行调整位置。


<font color=#7A869A>数据行排序：</font>


::: demo demos/sort 
:::



### 1.8 可选择数据行

在涉及到表单选择、或批量操作场景中，可在数据行前直接单选或多选操作对象。

<font color=#7A869A>单选：</font>
::: demo demos/select-single 
:::

<font color=#7A869A>多选：</font>
::: demo demos/select-multiple 
:::


### 1.9 自定义显示列
::: demo demos/show-columns 
:::


### 1.10 异步加载

::: demo demos/async-loading 
:::

### 1.11 普通加载
::: demo demos/loading 
:::

### 1.12 非受控筛选
::: demo demos/filter-uncontrolled 
:::

### 1.13 受控筛选
::: demo demos/filter-controlled 受控筛选
:::

### 属性配置

| 属性          | 类型                                            | 默认值           | 必传 | 说明                                      |
| ------------- | ----------------------------------------------- | ---------------- | ---- | ----------------------------------------- |
| data          | Array\<any\>                                    | -                | N    | 数据源                                    |
| columns       | Array\<any\>                                    | -                | N    | 列配置，参见 Column                       |
| rowKey        | String                                          | e.g. rowKey = id | Y    | rowKey = 'id'，指定 rowKey                |
| tableLayout   | String                                          | fixed            | N    | auto / fixed，表格布局方式                |
| verticalAlign | String                                          | middle           | N    | top / middle / bottom，行内容上下方向对齐 |
| size          | String                                          | default          | N    | large / small / default                   |
| border        | Boolean                                         | true             | N    | true / false，行边框 / 无边框             |
| hover         | Boolean                                         | true             | N    | true / false，hover 时是否高亮            |
| stripe        | Boolean                                         | false            | N    | true / false，斑马纹                      |
| empty         | String / Function(props): VNode / slots: {cost} | 暂无数据         | N    | 空表格                                    |
| height        | Number                                          |                  | N    |                                           |
| width         | Number                                          |                  | N    |                                           |
| rowClassName  | String/ Function(props): String                 | false            | N    | 自定义行样式                              |
| pagination    | Object                                          | false            | N    | 分页                                      |
| loading       | Boolean / Function(props): VNode                | false            | N    |                                           |
| asyncLoading  | Boolean                                         | false            | N    | 异步加载状态                              |
| showColumns   | Boolean                                         | -                | N    | 是否开启自定义列                          |

### Column

列描述数据对象，是 columns 中的一项

| 属性           | 类型                           | 默认值   | 必传 | 说明                          |
| -------------- | ------------------------------ | -------- | ---- | ----------------------------- |
| align          | String                         | -        | N    | left / right / center         |
| fixed          | String                         | -        | N    | left / right                  |
| colKey         | String                         | -        | Y    | -                             |
| title          | String / Function              | -        | -    | Y                             | 列标题 |
| width          | String / Number                | -        | -    | N                             | - |
| minWidth       | String / Number                | -        | -    | N                             | - |
| className      | String / Number                | -        | -    | N                             | 列样式 |
| children       | Array\<any\>                   | -        | -    | N                             | 多级表头 |
| attrs          | Object                         | -        | N    | 列的原生属性配置              |
| type           | String                         | -        | N    | 多选/单选，multiple or single |
| checkProps     | Object                         | -        | N    | 选择框的属性配置              |
| disabled       | Boolean                        | -        | N    | 是否禁用选项框                |
| sorter         | Boolean / Function             | -        | N    | 排序函数                      |
| sortType       | String / Null                  | null     | N    | 支持的排序方式                |
| filters        | Array\<Object\>                | -        | N    | 表头的筛选菜单项              |
| filteredValue  | Array\<String\>                | -        | N    | 筛选的受控属性                |
| filterIcon     | VNode / Function(props): VNode | null     | N    | 自定义 filter 图标            |
| filterMultiple | Boolean                        | false    | N    | 是否多选                      |
| render         | Function                       | -    | N    | 自定义单元格                   |
| scopedSlots    | Object | -    | N    | 自定义单元格（title - 通过插槽方式渲染表头，customRender - 通过插槽方式渲染表体单元格） |

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
