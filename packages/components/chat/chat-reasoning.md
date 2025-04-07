:: BASE_DOC ::

## API

### ChatReasoning Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
collapsePanelProps | Object | - | 透传给 CollapsePanel 组件的全部属性。TS 类型：`CollapsePanelProps`，[Collapse API Documents](./collapse?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/chat/type.ts) | N
expandIcon | Slot / Function | - | 当前折叠面板展开图标。优先级低于collapsePanelProps.expandIcon。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
expandIconPlacement | String | right | 展开图标位置，可选项：left/right。可选项：left/right | N
header | Slot / Function | - | 折叠面板头内容。优先级低于collapsePanelProps.header。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
headerRightContent | Slot / Function | - | 折叠面板尾内容。优先级低于collapsePanelProps.headerRightContent。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
onExpandChange | Function |  | TS 类型：`(value: CollapseValue) => void`<br/>展开图标点击事件。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/chat/type.ts)。<br/>`import { CollapseValue } from '@Collapse'`<br/> | N

### ChatReasoning Events

名称 | 参数 | 描述
-- | -- | --
expand-change | `(value: CollapseValue)` | 展开图标点击事件。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/chat/type.ts)。<br/>`import { CollapseValue } from '@Collapse'`<br/>
