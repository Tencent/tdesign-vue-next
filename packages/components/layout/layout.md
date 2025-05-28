:: BASE_DOC ::

## API

### Layout Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
direction | String | - | 【开发中】布局方向。可选项：vertical/horizontal | N


### Header Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
height | String | - | 顶栏高度。样式表（class）中定义的默认高度为：64px | N


### Aside Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
width | String | - | 侧边栏宽度。样式表（class）中定义的默认宽度为：232px | N


### Content Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
content | String / Slot / Function | - | 内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
default | String / Slot / Function | - | 内容，同 content。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N


### Footer Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
height | String | - | 底栏高度。样式表（class）中定义的默认高度为：24px | N
