:: BASE_DOC ::

## API
### Card Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
actions | String / Slot / Function | - | 卡片操作区。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
avatar | String / Slot / Function | - | 卡片中的用户头像，仅在海报风格的卡片中有效。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
bordered | Boolean | true | 是否有边框 | N
content | String / Slot / Function | - | 卡片内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
cover | String / Slot / Function | - | 卡片封面图。值类型为字符串，会自动使用 `img` 标签输出封面图；也可以完全最定义封面图。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | 卡片内容，同 content。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
description | String / Slot / Function | - | 卡片描述文案。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
footer | String / Slot / Function | - | 卡片底部内容，可完全自定义。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
header | String / Slot / Function | - | 卡片顶部内容，优先级高于其他所有元素。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
headerBordered | Boolean | false | 头部是否带分割线，仅在有header时有效 | N
hoverShadow | Boolean | false | hover时是否有阴影 | N
loading | Boolean / Slot / Function | false | 加载状态，值为 true 会根据不同的布局显示不同的加载状态，值为 false 则表示非加载状态。也可以使用 Skeleton 组件完全自定义加载态呈现内容。TS 类型：`boolean \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
loadingProps | Object | - | 透传加载组件(Loading)全部属性。TS 类型：`LoadingProps`，[Loading API Documents](./loading?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/card/type.ts) | N
shadow | Boolean | false | 是否显示卡片阴影，默认不显示 | N
size | String | medium | 尺寸。可选项：medium/small | N
status | String | - | 卡片状态内容，仅在操作区域不在顶部时有效（即 `theme=poster2` ） | N
subtitle | String / Slot / Function | - | 卡片副标题。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
theme | String | normal | 卡片风格：普通风格、海报风格1（操作区域在顶部）、海报风格2（操作区域在底部）。可选项：normal/poster1/poster2 | N
title | String / Slot / Function | - | 卡片标题。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
