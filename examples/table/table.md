:: BASE_DOC ::

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
| scopedSlots    | Object | -    | N    | 自定义单元格（title - 通过插槽方式渲染表头，col - 通过插槽方式渲染表体单元格） |

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
