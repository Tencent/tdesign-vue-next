:: BASE_DOC ::

## API

### Jumper Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
disabled | Boolean / Object | - | 按钮禁用配置。TS 类型：`boolean | JumperDisabledConfig` `type JumperDisabledConfig = { prev?: boolean; current?: boolean; next?: boolean; }`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/jumper/type.ts) | N
layout | String | horizontal | 按钮方向。可选项：horizontal/vertical | N
showCurrent | Boolean | true | 是否展示当前按钮。TS 类型：`boolean` | N
size | String | medium | 按钮尺寸。可选项：small/medium/large。TS 类型：`SizeEnum`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
tips | Object | - | 提示文案配置，值为 `true` 显示默认文案；值为 `false` 不显示提示文案；值类型为对象则单独配置文案内容。TS 类型：`boolean | JumperTipsConfig` `type JumperTipsConfig = { prev?: string; current?: string; next?: string; }`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/jumper/type.ts) | N
variant | String | text | 按钮形式。可选项：text/outline | N
onChange | Function |  | TS 类型：`(context: {e: MouseEvent, trigger: JumperTrigger}) => void`<br/>按钮点击事件回调。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/jumper/type.ts)。<br/>`type JumperTrigger = 'prev' | 'current' | 'next'`<br/> | N

### Jumper Events

名称 | 参数 | 描述
-- | -- | --
change | `(context: {e: MouseEvent, trigger: JumperTrigger})` | 按钮点击事件回调。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/jumper/type.ts)。<br/>`type JumperTrigger = 'prev' | 'current' | 'next'`<br/>
