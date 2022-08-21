:: BASE_DOC ::

## API

### Guide Props

name | type | default | description | required
-- | -- | -- | -- | --
counter | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
current | Number | - | `v-model` and `v-model:current` is supported | N
defaultCurrent | Number | - | uncontrolled property | N
finishButtonProps | Object | { content: '完成', theme: 'primary' } | Typescript：`ButtonProps` | N
hideCounter | Boolean | false | \- | N
hidePrev | Boolean | false | \- | N
hideSkip | Boolean | false | \- | N
initialNum | Number | 0 | \- | N
mask | Boolean | true | \- | N
mode | String | popup | options：popup/dialog | N
nextButtonProps | Object | { content: '下一步', theme: 'primary' } | Typescript：`ButtonProps`，[Button API Documents](./button?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/guide/type.ts) | N
prevButtonProps | Object | { content: '上一步', theme: 'primary' } | Typescript：`ButtonProps` | N
skipButtonProps | Object | { content: '跳过', theme: 'default' } | Typescript：`ButtonProps` | N
steps | Array | - | Typescript：`Array<TdGuideStepProps>` | N
onChange | Function |  | Typescript：`(current: number, total: number, context?: { e?: MouseEvent }) => void`<br/> | N
onClickNextStep | Function |  | Typescript：`( next: number, current: number, total: number, context?: { e?: MouseEvent }) => void`<br/> | N
onClickPrevStep | Function |  | Typescript：`( prev: number, current: number, total: number, context?: { e?: MouseEvent }) => void`<br/> | N
onFinish | Function |  | Typescript：`( current: number, total: number, context?: { e?: MouseEvent }) => void`<br/> | N
onSkip | Function |  | Typescript：`(current: number, total: number, context?: { e?: MouseEvent }) => void`<br/> | N

### Guide Events

name | params | description
-- | -- | --
change | `(current: number, total: number, context?: { e?: MouseEvent })` | \-
click-next-step | `( next: number, current: number, total: number, context?: { e?: MouseEvent })` | \-
click-prev-step | `( prev: number, current: number, total: number, context?: { e?: MouseEvent })` | \-
finish | `( current: number, total: number, context?: { e?: MouseEvent })` | \-
skip | `(current: number, total: number, context?: { e?: MouseEvent })` | \-

### GuideStep Props

name | type | default | description | required
-- | -- | -- | -- | --
children | String / Slot / Function | - | Typescript：`string | TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
content | String / Slot / Function | - | Typescript：`string | TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
description | String | - | \- | N
element | String / Function | - | required。Typescript：`AttachNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | Y
nextButtonProps | Object | - | Typescript：`ButtonProps` | N
offset | Array | - | Typescript：`Array<string | number>` | N
placement | String | top | Typescript：`StepPopupPlacement | StepDialogPlacement` `type StepPopupPlacement = 'top'|'left'|'right'|'bottom'|'top-left'|'top-right'|'bottom-left'|'bottom-right'|'left-top'|'left-bottom'|'right-top'|'right-bottom'` `type StepDialogPlacement = 'top'|'center' `。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/guide/type.ts) | N
prevButtonProps | Object | - | Typescript：`ButtonProps` | N
skipButtonProps | Object | - | Typescript：`ButtonProps` | N
stepOverlayClass | String | - | \- | N
title | String | - | \- | N
