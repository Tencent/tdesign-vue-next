:: BASE_DOC ::

### 模拟超出省略原生属性

{{ mouse }}

### 定时消失

{{ duration }}

## API
### Tooltip Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
delay | Number | - | 【议案讨论中】延迟出现提示，用于异步加载提示信息需要延迟显示的业务场景下 | N
destroyOnClose | Boolean | true | 是否在关闭浮层时销毁浮层 | N
duration | Number | - | 用于设置提示默认显示多长时间之后消失，初始第一次有效，单位：毫秒 | N
placement | String | top | 浮层出现位置。TS 类型：`'mouse' | PopupPlacement`，[Popup API Documents](./popup?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/tooltip/type.ts) | N
showArrow | Boolean | true | 是否显示浮层箭头 | N
theme | String | default | 文字提示风格。可选项：default/primary/success/danger/warning/light | N
`Omit<PopupProps, 'placement'>` | \- | - | 继承 `Omit<PopupProps, 'placement'>` 中的全部 API | N
