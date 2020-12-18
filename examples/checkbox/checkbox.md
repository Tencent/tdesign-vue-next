:: BASE_DOC ::

### 半选样式
::: demo demos/indeterminate 
:::

### 受控的checkbox
::: demo demos/demo 
:::

### checkbox组
::: demo demos/checkbox-group 
:::

### 属性配置
#### Checkbox Props
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|checked|boolean|false|否|是否为选中状态|
|defaultChecked|boolean|false|否|初始是否选中|
|disabled|boolean|false|否|是否禁用复选框|
|indeterminate|boolean|false|否|是否为半选样式|
|name|string|-|否|input name|

#### Checkbox Events
| 事件名称 | 回调参数 | 说明 |
|-----|-----|-----|
|change|event|变化时触发的事件|

#### Checkbox Group Props
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|defaultValue|string[]|[]|否|默认选中的值|
|value/v-model|string[]|[]|否|选中的值|
|disabled|boolean|false|否|禁选所有子单选器|
|options|string[] &#124; Array<{ label: string value: string disabled?: boolean }>|[]|否|以配置形式设置子元素|
|name|string|-|否|所有 input checkbox 的 name 属性|

#### Checkbox Group Events
| 事件名称 | 回调参数 | 说明 |
|-----|-----|-----|
|change|选中的值|变化时触发的事件|
