
### TableRowState
名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
expandChildrenLength | Number | - | 当前节点展开的子节点数量 | N
expanded | Boolean | false | 必需。表格行是否展开 | Y
level | Number | - | 当前节点层级。TS 类型：`number` | N
parent | - | - | 父节点。TS 类型：`TableRowState<T>` | N
path | Array | - | 当前节点路径。TS 类型：`TableRowState<T>[]` | N
row | - | - | 必需。原始表格行数据。TS 类型：`T` | Y
rowIndex | Number | - | 必需。表格行下标 | Y
