:: BASE_DOC ::

## API

### Split Props

| 名称           | 类型                     | 默认值     | 描述                                                                                                                                              | 必传 |
| -------------- | ------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| direction      | String                   | horizontal | 分割方向。horizontal：左右排列；vertical：上下排列。可选项：horizontal/vertical                                                                   | N    |
| draggerIcon    | String / Slot / Function | -          | 拖拽图标。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)      | N    |
| gap            | Number                   | 0          | 面板之间的间距（px），会体现在分割条视觉上                                                                                                        | N    |
| lazy           | Boolean                  | false      | 延迟渲染模式                                                                                                                                      | N    |
| panelSize      | Object                   | -          | 定义每个面板的最大最小比例。TS 类型：`{min?: number; max?: number }`                                                                              | N    |
| splitClassName | String                   | -          | 自定义分割条的样式类名                                                                                                                            | N    |
| splitSize      | Number                   | 6          | 分割条的可交互区域宽度/高度（px）                                                                                                                 | N    |
| splitStyle     | Object                   | -          | 自定义分割条的内联样式。TS 类型：`Styles`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N    |
| onResize       | Function                 |            | TS 类型：`(sizes: number[]) => void`<br/>拖拽过程中尺寸变化的回调（像素值数组）                                                                   | N    |
| onResizeEnd    | Function                 |            | TS 类型：`(sizes: number[]) => void`<br/>拖拽结束时的回调                                                                                         | N    |
| onResizeStart  | Function                 |            | TS 类型：`(sizes: number[]) => void`<br/>开始拖拽时的回调                                                                                         | N    |

### Split Events

| 名称         | 参数                | 描述                                   |
| ------------ | ------------------- | -------------------------------------- |
| resize       | `(sizes: number[])` | 拖拽过程中尺寸变化的回调（像素值数组） |
| resize-end   | `(sizes: number[])` | 拖拽结束时的回调                       |
| resize-start | `(sizes: number[])` | 开始拖拽时的回调                       |

### SplitInstanceFunctions 组件实例方法

| 名称     | 参数                                       | 返回值     | 描述                     |
| -------- | ------------------------------------------ | ---------- | ------------------------ |
| getSizes | \-                                         | `number[]` | 获取当前各面板的像素尺寸 |
| reset    | \-                                         | \-         | 重置为初始尺寸           |
| setSizes | `(sizes: (number \| string \| 'auto')[]) ` | \-         | 程序化设置尺寸           |

### SplitPanel Props

| 名称        | 类型            | 默认值 | 描述                                                                            | 必传 |
| ----------- | --------------- | ------ | ------------------------------------------------------------------------------- | ---- |
| defaultSize | String / Number | -      | 初始面板大小，支持数字 px 或者文字 '百分比%' 类型                               | N    |
| max         | String / Number | -      | 当前面板的最大尺寸，支持数字 px 或者文字 '百分比%' 类型，继承父级 panelSize.max | N    |
| min         | String / Number | -      | 当前面板的最小尺寸，支持数字 px 或者文字 '百分比%' 类型，继承父级 panelSize.min | N    |
| resizable   | Boolean         | true   | 是否开启拖拽伸缩                                                                | N    |
