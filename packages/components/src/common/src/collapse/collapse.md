:: BASE_DOC ::

## API
### Collapse Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
borderless | Boolean | false | 是否为无边框模式 | N
defaultExpandAll | Boolean | false | 默认是否展开全部 | N
disabled | Boolean | - | 是否禁用面板展开/收起操作 | N
expandIcon | Boolean / Slot / Function | true | 展开图标。值为 undefined 或 false 则不显示展开图标；值为 true 显示默认图标；值类型为函数，则表示完全自定义展开图标。TS 类型：`boolean \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
expandIconPlacement | String | left | 展开图标的位置，左侧或右侧。可选项：left/right | N
expandMutex | Boolean | false | 每个面板互斥展开，每次只展开一个面板 | N
expandOnRowClick | Boolean | true | 是否允许点击整行标题展开面板 | N
value | Array | [] | 展开的面板集合。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`CollapseValue` `type CollapseValue = Array<string \| number>`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/collapse/type.ts) | N
defaultValue | Array | [] | 展开的面板集合。非受控属性。TS 类型：`CollapseValue` `type CollapseValue = Array<string \| number>`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/collapse/type.ts) | N
onChange | Function |  | TS 类型：`(value: CollapseValue) => void`<br/>切换面板时触发，返回变化的值 | N

### Collapse Events

名称 | 参数 | 描述
-- | -- | --
change | `(value: CollapseValue)` | 切换面板时触发，返回变化的值

### CollapsePanel Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
content | String / Slot / Function | - | 折叠面板内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | 折叠面板内容，同 content。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
destroyOnCollapse | Boolean | false | 当前面板处理折叠状态时，是否销毁面板内容 | N
disabled | Boolean | undefined | 禁止当前面板展开，优先级大于 Collapse 的同名属性 | N
expandIcon | Boolean / Slot / Function | undefined | 当前折叠面板展开图标，优先级大于 Collapse 的同名属性。TS 类型：`boolean \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
header | String / Slot / Function | - | 面板头内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
headerRightContent | String / Slot / Function | - | 面板头的右侧区域，一般用于呈现面板操作。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
value | String / Number | - | 必需。当前面板唯一标识，如果值为空则取当前面下标兜底作为唯一标识 | Y
