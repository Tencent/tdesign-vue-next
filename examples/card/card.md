:: BASE_DOC ::

## API

### Card Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
actions | String / Slot / Function | - | 卡片标题的操作区。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
bordered | Boolean | true | 是否有边框 | N
cover | String / Slot / Function | - | 卡片封面图。值类型为字符串，会自动使用 `img` 标签输出封面图；也可以完全最定义封面图。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
footer | String / Slot / Function | - | 卡片底部内容，可完全自定义。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
loading | Boolean / Slot / Function | false | 加载状态，值为 true 会根据不同的布局显示不同的加载状态，值为 false 则表示非加载状态。也可以使用 Sketon 组件完全自定义加载态呈现内容。TS 类型：`boolean | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
shadow | Boolean | false | 是否显示卡片阴影，默认不显示 | N
size | String | medium | 尺寸。可选项：medium/small | N
title | String / Slot / Function | - | 卡片标题。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
