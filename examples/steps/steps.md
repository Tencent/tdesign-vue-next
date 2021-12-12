:: BASE_DOC ::
## API

### Steps Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
current | String / Number | - | 当前步骤，即整个步骤条进度。默认根据步骤下标判断步骤的完成状态，当前步骤为进行中，当前步骤之前的步骤为已完成，当前步骤之后的步骤为未开始。如果每个步骤没有设置 value，current 值为步骤长度则表示所有步骤已完成。如果每个步骤设置了自定义 value，则 current = 'FINISH' 表示所有状态完成。支持语法糖 | N
defaultCurrent | String / Number | - | 当前步骤，即整个步骤条进度。默认根据步骤下标判断步骤的完成状态，当前步骤为进行中，当前步骤之前的步骤为已完成，当前步骤之后的步骤为未开始。如果每个步骤没有设置 value，current 值为步骤长度则表示所有步骤已完成。如果每个步骤设置了自定义 value，则 current = 'FINISH' 表示所有状态完成。非受控属性 | N
direction | String | horizontal | 已废弃。步骤条方向，有两种：横向和纵向。可选项：horizontal/vertical | N
layout | String | horizontal | 步骤条方向，有两种：横向和纵向。可选项：horizontal/vertical | N
options | Array | - | 步骤条数据列表（作用和 StepItem 效果一样）。TS 类型：`Array<TdStepItemProps>` | N
sequence | String | positive | 步骤条顺序，纵向步骤有效（direction = horizontal）。可选项：positive/reverse | N
theme | String | default | 步骤条风格。可选项：default/dot | N
onChange | Function |  | 当前步骤发生变化时触发。`(current: string | number, previous: string | number, context?: { e?: MouseEvent }) => {}` | N

### Steps Events

名称 | 参数 | 描述
-- | -- | --
change | `(current: string | number, previous: string | number, context?: { e?: MouseEvent })` | 当前步骤发生变化时触发

### StepItem Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
content | String / Slot / Function | '' | 步骤描述。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | 步骤描述，同 content。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
extra | String / Slot / Function | - | 显示在步骤描述下方的额外内容，比如：操作项。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
icon | Boolean / Slot / Function | true | 图标，默认显示内置图标，也可以自定义图标，值为 false 则不显示图标。优先级大于 `status` 定义的图标。TS 类型：`boolean | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
status | String | default | 当前步骤的状态。可选项：default/process/finish/error。TS 类型：`StepStatus`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/steps/type.ts) | N
title | String / Slot / Function | '' | 标题。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
value | String / Number | - | 当前步骤标识 | N
