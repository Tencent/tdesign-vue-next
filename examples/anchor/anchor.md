:: BASE_DOC ::

## API

### Anchor Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
affixProps | Object | - | 透传 Affix 组件属性，即让 Anchor 组件支持所有 Affix 组件特性。TS 类型：`AffixProps`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/anchor/type.ts) | N
bounds | Number | 5 | 锚点区域边界 | N
container | String / Function | () => (() => window) | 指定滚动的容器。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body。TS 类型：`ScrollContainer` | N
cursor | Slot / Function | - | 用于自定义选中项左侧游标。TS 类型：`TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
size | String | medium | 组件尺寸，small(120px)，medium(200px)，large(320px)。可选项：small / medium / large | N
targetOffset | Number | 0 | 锚点滚动偏移量 | N
onChange | Function |  | 锚点改变时触发。`(currentLink: string, prevLink: string) => {}` | N
onClick | Function |  | 锚点被点击时触发。`(link: { href: string; title: string; e: MouseEvent }) => {}` | N

### Anchor Events

名称 | 参数 | 描述
-- | -- | --
change | `(currentLink: string, prevLink: string)` | 锚点改变时触发
click | `(link: { href: string; title: string; e: MouseEvent })` | 锚点被点击时触发

### AnchorItem Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
href | String | - | 必需。锚点链接, 如果是 hash 模式需要加上当前 path | Y
target | String | _self | 锚点文本。可选项：_self/_blank/_parent/_top | N
title | String / Slot / Function | '' | 锚点文本。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N

### AnchorTarget Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
id | String | - | 必需。目标内容 id | Y
tag | String | div | 渲染的标签 | N
