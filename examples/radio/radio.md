:: BASE_DOC ::


### 属性配置
#### Radio Props
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|checked|boolean|false|否|是否为选中状态|
|defaultChecked|boolean|false|否|初始是否选中|
|disabled|boolean|false|否|是否禁用状态|
|name|string|-|否|input name|

#### Radio Events
| 事件名称 | 回调参数 | 说明 |
|-----|-----|-----|
|change|event|变化时触发的事件|

#### Radio Group Props
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|defaultValue|string|-|否|默认选中的值|
|value/v-model|string|-|否|选中的值|
|disabled|boolean|false|否|禁选所有子单选器|
|options|string[] &#124; Array<{ label: string value: string disabled?: boolean }>|[]|否|以配置形式设置子元素|
|name|string|-|否|所有 input radio 的 name 属性|
|size|large &#124; default &#124; small|default|否|按钮样式的大小|
|buttonStyle|outline &#124; solid|outline|否|按钮样式的风格|

#### Radio Group Events
| 事件名称 | 回调参数 | 说明 |
|-----|-----|-----|
|change|选中的值|变化时触发的事件|
