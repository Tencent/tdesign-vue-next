:: BASE_DOC ::

## API

### Transfer Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
checkboxProps | Object | - | 用于控制复选框属性。TS 类型：`CheckboxProps`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/transfer/type.ts) | N
checked | Array | [] | 数据列表选中项。支持语法糖。TS 类型：`Array<TransferValue>` | N
defaultChecked | Array | [] | 数据列表选中项。非受控属性。TS 类型：`Array<TransferValue>` | N
data | Array | [] | 全量数据。TS 类型：`Array<T>` | N
direction | String | both | 穿梭框可操作方向。可选项：left/right/both | N
disabled | Boolean / Array | false | 禁用全部操作：搜索、选中、移动、分页等。[源列表, 目标列表]，示例：[true, false] 或者 true。TS 类型：`boolean | Array<boolean>` | N
empty | String / Array / Slot / Function | '' | 列表为空时呈现的内容。值类型为数组，则表示分别控制源列表和目标列表数据为空的呈现内容。TS 类型：`EmptyType | Array<EmptyType> | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/transfer/type.ts) | N
footer | Array / Slot / Function | - | 穿梭框底部内容。TS 类型：`Array<string | TNode> | TNode<{ type: TransferListType }>`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
keys | Object | - | 用来定义选项文本和选项值字段，示例：`{ label: 'text', value: 'id' }`，表示选项文本取 `text` 字段，选项值取 `id` 字段。TS 类型：`KeysType`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
operation | Array / Slot / Function | - | 方向操作按钮。默认显示组件内置操作图标。自定义操作图标示例：['向左', '向右'] 或者 `[() => <i class='left' />, () => <i class='left' />]` 或者 `(h, direction) => direction === 'left' ? '《' : '》'`。TS 类型：`Array<string | TNode> | TNode<{ direction: 'left' | 'right' }>`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
pagination | Object / Array | - | 分页配置，值为空则不显示。具体 API 参考分页组件。值类型为数组，表示可分别控制源列表和目标列表分页组件。TS 类型：`PaginationProps | Array<PaginationProps>`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/transfer/type.ts) | N
search | Boolean / Object / Array | false | 搜索框配置，值为 false 表示不显示搜索框；值为 true 表示显示默认搜索框；值类型为对象，用于透传 Props 到 Input 组件；值类型为数组，则分别表示控制两侧搜索框。TS 类型：`SearchOption | Array<SearchOption>`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/transfer/type.ts) | N
showCheckAll | Boolean / Array | true | 是否显示全选，值类型为数组则表示分别控制源列表和目标列表。TS 类型：`boolean | Array<boolean>` | N
targetSort | String | original | 目标数据列表排列顺序。可选项：original/push/unshift | N
title | Array / Slot / Function | [] | 穿梭框标题，示例：['源列表', '目标列表'] 或者 `[() => 'A', () => 'B']` 或者 `({ type }) => type === 'source' ? '源' : '目标'`。TS 类型：`Array<TitleType> | TNode<{ type: TransferListType }>`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/transfer/type.ts) | N
transferItem | Slot / Function | - | 自定义渲染节点。TS 类型：`TNode<TransferItem<T>>`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/transfer/type.ts) | N
value | Array | [] | 目标数据列表数据。支持语法糖。TS 类型：`Array<TransferValue>` | N
defaultValue | Array | [] | 目标数据列表数据。非受控属性。TS 类型：`Array<TransferValue>` | N
onChange | Function |  | 数据列表发生变化时触发，`type` 值为 `source`，表示源列表移动到目标列表，值为 `target` 表示目标列表移动到源列表，movedValue 则表示被移动的选项。TS 类型：`TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/transfer/type.ts)。`(targetValue: Array<TransferValue>, context: TargetParams) => {}` | N
onCheckedChange | Function |  | 源数据列表或目标数据列表的选中项发生变化时触发，`context.type` 可以区分触发来源是目标列表，还是源列表。TS 类型：`TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/transfer/type.ts)。`(options: CheckedOptions) => {}` | N
onPageChange | Function |  | 分页发生变化时触发。`(page: PageInfo, context: { type: TransferListType }) => {}` | N
onScroll | Function |  | 列表滚动时触发，bottomDistance 表示元素滚动到底部的距离。TS 类型：`TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts)。`(options: { e: Event; bottomDistance: number; type: TransferListType }) => {}` | N
onSearch | Function |  | 搜索时触发，options.query 表示用户输入的内容。TS 类型：`TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/transfer/type.ts)。`(options: SearchContext) => {}` | N

### Transfer Events

名称 | 参数 | 描述
-- | -- | --
change | `(targetValue: Array<TransferValue>, context: TargetParams)` | 数据列表发生变化时触发，`type` 值为 `source`，表示源列表移动到目标列表，值为 `target` 表示目标列表移动到源列表，movedValue 则表示被移动的选项。TS 类型：`TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/transfer/type.ts)
checked-change | `(options: CheckedOptions)` | 源数据列表或目标数据列表的选中项发生变化时触发，`context.type` 可以区分触发来源是目标列表，还是源列表。TS 类型：`TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/transfer/type.ts)
page-change | `(page: PageInfo, context: { type: TransferListType })` | 分页发生变化时触发
scroll | `(options: { e: Event; bottomDistance: number; type: TransferListType })` | 列表滚动时触发，bottomDistance 表示元素滚动到底部的距离。TS 类型：`TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts)
search | `(options: SearchContext)` | 搜索时触发，options.query 表示用户输入的内容。TS 类型：`TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts)。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/transfer/type.ts)
