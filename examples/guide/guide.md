:: BASE_DOC ::
## API
### Guide Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
counter | Slot / Function | - | 用于自定义渲染计数部分。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
current | Number | - | 当前步骤，即整个引导的进度。支持语法糖 `v-model` 或 `v-model:current` | N
defaultCurrent | Number | - | 当前步骤，即整个引导的进度。非受控属性 | N
finishButtonProps | Object | `{ content: '完成', theme: 'primary' }` | 透传 完成 的全部属性。TS 类型：`ButtonProps` | N
hideCounter | Boolean | false | 是否隐藏计数 | N
hidePrev | Boolean | false | 是否隐藏上一步按钮 | N
hideSkip | Boolean | false | 是否隐藏跳过按钮 | N
initialNum | Number | 0 | 起始序号 | N
mask | Boolean | true | 是否出现遮罩层 | N
mode | String | popup | 引导框的类型。可选项：popup/dialog | N
nextButtonProps | Object | `{ content: '下一步', theme: 'primary' }` | 透传 下一步按钮 的全部属性。TS 类型：`ButtonProps`，[Button API Documents](./button?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/guide/type.ts) | N
prevButtonProps | Object | `{ content: '上一步', theme: 'primary' }` | 透传 上一步按钮 的全部属性。TS 类型：`ButtonProps` | N
skipButtonProps | Object | `{ content: '跳过', theme: 'default' }` | 透传 跳过按钮 的全部属性。TS 类型：`ButtonProps` | N
steps | Array | - | 用于定义每个步骤的内容，包括高亮的节点、相对位置和具体的文案内容等。。TS 类型：`Array<TdGuideStepProps>` | N
onChange | Function |  | TS 类型：`(current: number, total: number, context?: { e?: MouseEvent }) => void`<br/>当前步骤发生变化时触发 | N
onClickNextStep | Function |  | TS 类型：`( next: number, current: number, total: number, context?: { e?: MouseEvent }) => void`<br/>点击下一步时触发 | N
onClickPrevStep | Function |  | TS 类型：`( prev: number, current: number, total: number, context?: { e?: MouseEvent }) => void`<br/>点击上一步时触发 | N
onFinish | Function |  | TS 类型：`( current: number, total: number, context?: { e?: MouseEvent }) => void`<br/>点击完成按钮时触发 | N
onSkip | Function |  | TS 类型：`(current: number, total: number, context?: { e?: MouseEvent }) => void`<br/>点击跳过按钮时触发 | N

### Guide Events

名称 | 参数 | 描述
-- | -- | --
change | `(current: number, total: number, context?: { e?: MouseEvent })` | 当前步骤发生变化时触发
click-next-step | `( next: number, current: number, total: number, context?: { e?: MouseEvent })` | 点击下一步时触发
click-prev-step | `( prev: number, current: number, total: number, context?: { e?: MouseEvent })` | 点击上一步时触发
finish | `( current: number, total: number, context?: { e?: MouseEvent })` | 点击完成按钮时触发
skip | `(current: number, total: number, context?: { e?: MouseEvent })` | 点击跳过按钮时触发

### GuideStep Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
children | String / Slot / Function | - | 自定义内容，同 content。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
content | String / Slot / Function | - | 用户自定义引导弹框的内容，一旦存在，此时除 `placement`、`offset`和`element` 外，其它属性全部失效）。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
description | String | - | 当前步骤的描述内容 | N
element | String / Function | - | 必需。高亮的节点。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'#tdesign' 或 () => document.querySelector('#tdesign')。TS 类型：`AttachNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | Y
nextButtonProps | Object | - | 用于自定义当前引导框的下一步按钮的内容。TS 类型：`ButtonProps` | N
offset | Array | - | 相对于 placement 的偏移量，示例：[-10, 20] 或 ['10px', '8px']。TS 类型：`Array<string | number>` | N
placement | String | top | 引导框相对于高亮元素出现的位置。TS 类型：`StepPopupPlacement | StepDialogPlacement` `type StepPopupPlacement = 'top'|'left'|'right'|'bottom'|'top-left'|'top-right'|'bottom-left'|'bottom-right'|'left-top'|'left-bottom'|'right-top'|'right-bottom'` `type StepDialogPlacement = 'top'|'center' `。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/guide/type.ts) | N
prevButtonProps | Object | - | 用于自定义当前引导框的上一步按钮的内容。TS 类型：`ButtonProps` | N
skipButtonProps | Object | - | 用于自定义当前步骤引导框的跳过按钮的内容。TS 类型：`ButtonProps` | N
stepOverlayClass | String | - | 覆盖引导框的类名 | N
title | String | - | 当前步骤的标题内容 | N
