:: BASE_DOC ::

## API

### Descriptions Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
bordered | Boolean | false | 是否带边框 | N
colon | Boolean | - | 字段名右侧是否携带冒号“：” | N
column | Number | 2 | 一行 `DescriptionsItem` 的数量 | N
contentStyle | Object | - | 自定义描述项内容的样式。TS 类型：`Styles`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
itemLayout | String | horizontal | 描述项的排列方向。可选项：horizontal/vertical | N
items | Array | - | 描述项的列表。TS 类型：`Array<TdDescriptionsItemProps>` | N
labelStyle | Object | - | 自定义描述项标签的样式，需要配合 `tableLayout` 为 `auto` 才可以生效。TS 类型：`Styles`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
layout | String | horizontal | 排列方向。可选项：horizontal/vertical | N
size | String | medium | 组件尺寸。可选项：small/medium/large。TS 类型：`SizeEnum`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
tableLayout | String | fixed | 用于设置底层 `table` 单元格、行和列的布局算法，与原生 table-layout css 属性完全一致。`fixed`：采用固定布局算法；`auto`：采用自动布局算法。详情可参考 [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout)。可选项：fixed/auto | N
title | String / Slot / Function | - | 描述列表的标题。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N


### DescriptionsItem Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
content | String / Slot / Function | - | 描述项内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
default | String / Slot / Function | - | 描述项内容，同 `content`。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
label | String / Slot / Function | - | 描述项标签。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
span | Number | 1 | 占用的宽度数量 | N
