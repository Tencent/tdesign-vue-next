## Tag 标签

::: demo demos/default 默认
:::

::: demo demos/theme 主题&效果
:::

::: demo demos/closable 可删除标签
:::

::: demo demos/icon 图标标签
:::

::: demo demos/disabled 失效标签（只针对于默认主题，其它主题不生效）
:::

::: demo demos/checkable 可选标签（只针对于默认主题，其它主题不生效）
:::

::: demo demos/long-text 超长文本省略标签
:::

::: demo demos/size 尺寸
:::

::: demo demos/shape 形状
:::

### Tag Props

| 平台 | 属性     | 类型                 | 默认值  | 必传 | 说明                                                  |
| ---- | -------- | -------------------- | ------- | ---- | ----------------------------------------------------- |
| 公有 | theme    | String               | default | N    | 标签风格：default/primary/info/warning/danger/success/primary-light/info-light/warning-light/danger-light/success-light |
| 公有 | size     | String               | middle | N    | 尺寸：large/middle/small（大/中(默认)/小）           |
| 公有 | closable | Boolean               | false   | N    | 标签是否可关闭                                        |
| 公有 | icon     | String/Function/Slot | -       | N    | 标签图标                                              |
| 公有 | shape    | String               | square  | N    | 标签边角类型：square/round/mark                     |
| 公有 | maxWidth | Number/String     | -  | N    | 标签内容宽度超出 maxWidth 时，会出现省略号                     |
| 公有 | effect   | String | dark/light/plain | dark | 主题效果：深色（默认），浅色，朴素。dark | light | plain                  |
| 公有 | default  | Function/Slot        | -       | N    | 支持 slots                                            |

### Tag Events

关于事件名称，vue 不加 on，react 加 on。
示例：`close` for vue. `onClose` for react.

| 平台 | 事件名称 | 参数 | 说明               |
| ---- | -------- | ---- | ------------------ |
| 公有 | close    | -    | 点击关闭按钮时触发 |
| 公有 | click    | -    | 点击标签时触发     |

### CheckTag Props

| 平台 | 属性     | 类型                 | 默认值  | 必传 | 说明                                                  |
| ---- | -------- | -------------------- | ------- | ---- | ----------------------------------------------------- |
| 公有 | checked  | Boolean              | false   | N    | 标签选中的状态（只针对于默认 theme 的风格才有选中态）                                       |
| 公有 | disabled  | Boolean              | false   | N    | 标签失效的状态（只针对于默认 theme 的风格才有失效态），失效标签不能触发事件                                       |

### CheckTag Events

| 平台 | 事件名称 | 参数 | 说明               |
| ---- | -------- | ---- | ------------------ |
| 公有 | click    | -    | 点击标签时触发     |
