:: BASE_DOC ::

## API

### Split Props

| name           | type                     | default    | description                                                                                                                                                                    | required |
| -------------- | ------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| direction      | String                   | horizontal | Dividing direction. Horizontal: arranged horizontally; Vertical: arranged vertically. Options: horizontal/vertical                                                             | N        |
| draggerIcon    | String / Slot / Function | -          | Drag icon. TypeScript: `string \| TNode`. [See more type definitions](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)                  | N        |
| gap            | Number                   | 0          | Spacing between panels in pixels, reflected in the visual appearance of the divider                                                                                            | N        |
| lazy           | Boolean                  | false      | Deferred rendering mode                                                                                                                                                        | N        |
| panelSize      | Object                   | -          | Defines the minimum and maximum size shared by each panel. TypeScript: `{ min?: number; max?: number }`                                                                        | N        |
| splitClassName | String                   | -          | Custom class name for the divider                                                                                                                                              | N        |
| splitSize      | Number                   | 6          | Width or height in pixels of the divider's interactive area                                                                                                                    | N        |
| splitStyle     | Object                   | -          | Custom inline style for the divider. TypeScript: `Styles`. [See more type definitions](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N        |
| onResize       | Function                 |            | TypeScript: `(sizes: number[]) => void`<br/>Callback when panel sizes change during dragging                                                                                   | N        |
| onResizeEnd    | Function                 |            | TypeScript: `(sizes: number[]) => void`<br/>Callback when dragging ends                                                                                                        | N        |
| onResizeStart  | Function                 |            | TypeScript: `(sizes: number[]) => void`<br/>Callback when dragging starts                                                                                                      | N        |

### Split Events

| name         | params              | description                                     |
| ------------ | ------------------- | ----------------------------------------------- |
| resize       | `(sizes: number[])` | Emitted when panel sizes change during dragging |
| resize-end   | `(sizes: number[])` | Emitted when dragging ends                      |
| resize-start | `(sizes: number[])` | Emitted when dragging starts                    |

### SplitInstanceFunctions

| name     | params                                    | return     | description                               |
| -------- | ----------------------------------------- | ---------- | ----------------------------------------- |
| getSizes | \-                                        | `number[]` | Gets the current pixel size of each panel |
| reset    | \-                                        | \-         | Resets panels to their initial sizes      |
| setSizes | `(sizes: (number \| string \| 'auto')[])` | \-         | Programmatically sets panel sizes         |

### SplitPanel Props

| name        | type            | default | description                                                                                           | required |
| ----------- | --------------- | ------- | ----------------------------------------------------------------------------------------------------- | -------- |
| defaultSize | String / Number | -       | Initial panel size, supporting pixel numbers or percentage strings                                    | N        |
| max         | String / Number | -       | Maximum panel size, supporting pixel numbers or percentage strings; inherits panelSize.max from Split | N        |
| min         | String / Number | -       | Minimum panel size, supporting pixel numbers or percentage strings; inherits panelSize.min from Split | N        |
| resizable   | Boolean         | true    | Whether the panel can be resized by dragging                                                          | N        |
