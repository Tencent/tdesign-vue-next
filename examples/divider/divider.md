:: BASE_DOC ::

## API

### Divider Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
align | String | center | 文本位置（仅在水平分割线有效）。可选项：left/right/center | N
content | String / Slot / Function | - | 子元素。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
dashed | Boolean | false | 是否虚线（仅在水平分割线有效） | N
default | String / Slot / Function | - | 子元素，同 content。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
layout | String | horizontal | 分隔线类型有两种：水平和垂直。可选项：horizontal/vertical | N
theme | String | horizontal | 已废弃。请更为使用 `layout`。分隔线类型有两种：水平和垂直。可选项：horizontal/vertical | N
