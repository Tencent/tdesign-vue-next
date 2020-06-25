## tabs 

::: demo demos/base 默认
:::
::: demo demos/type 选项卡类型
:::
::: demo demos/position 选项卡位置
:::
::: demo demos/size 尺寸
:::
::: demo demos/ban 选项卡禁止点击
:::
::: demo demos/scroll 选项卡滚动
:::
::: demo demos/edit 动态选项卡
:::

### 属性配置
#### tabs
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
| theme | String | "normal" | false | 选项卡类型：nomral、card |
| activeName | String/Number | "0" | false | 初始化激活的选项卡name |
| size | String | "middle" | false | 选项卡尺寸：middle、large |
| tabPosition | String | "top" | false | 选项卡位置：top、right、bottom、left |
| addable | Boolean | false | false | 是否显示添加按钮 |

#### tab-panel
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
| name | String/Number | "0" | true | 选项板name，不可重复 |
| label | String | "" | false | 选项卡显示名称 |
| disabled | Boolean | false | false | 选项卡是否禁用 |
| closable | Boolean | false | false | 选项卡是否可移除 |
| forceRender | Boolean | false | false | 选项板强制渲染 |