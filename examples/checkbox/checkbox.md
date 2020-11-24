## Checkbox 多选框

多选框是一个选择控件，允许用户通过单击在选中和未选中之间切换。

多选框是一个标记控件，不会立即生效，需要通过触发操作按钮（如：提交、确认等）后生效

## 何时使用
需要从一个数据集中选择多个选项时

需要对两种状态进行切换时（选中或未选中，打开或关闭），可单独使用多选框

## 1.组件类型
### 1.1.基础多选框

::: demo demos/base 基础示例
:::

### 1.2.联动多选框
联动多选框指多选框与其他组件配合使用

::: demo demos/default-checked 初始选中与否
:::


::: demo demos/disabled 不可用
:::

::: demo demos/indeterminate 半选样式
:::

::: demo demos/demo 受控的checkbox
:::

::: demo demos/checkbox-group checkbox组
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
