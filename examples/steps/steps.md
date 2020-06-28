## steps 

::: demo demos/horizontal 水平步骤条——带序号
:::

::: demo demos/horizontal-dot 水平步骤条——不带序号
:::

::: demo demos/vertical 垂直步骤条——带序号
:::

::: demo demos/vertical-dot 垂直步骤条——不带序号
:::

::: demo demos/extra 带额外内容步骤条
:::

::: demo demos/status 步骤状态
:::

### 属性配置

#### Steps Props
|平台|属性名称     |类型    |默认值       |必传|说明                                                      |
|--|---------|------|----------|--|--------------------------------------------------------|
|PC|current  |Number|0         |N |当前步骤，从0开始计数                                             |
|PC|direction|String|horizontal|N |方向：horizontal，vertical                                  |
|PC|status   |String|process   |N |当前步骤的状态，可选值为wait、process、finish、error                   |
|PC|type     |String|default   |N |步骤标识样式：default | dot                                    |
|PC|sequence |String|positive  |N |步骤条顺序，默认为 positive（正序），可选值为 positive | reverse，只有垂直样式时生效|

#### Steps Event
|平台|事件名称  |参数               |说明                         |
|--|------|-----------------|---------------------------|
|公有|change|current, previous|切换步骤时触发，提供“当前步骤”和“上一步骤”的下标值|

#### Step Props
|平台|属性名称   |类型            |默认值    |必传|说明                                                                |
|--|-------|--------------|-------|--|------------------------------------------------------------------|
|PC|status |Stirng        |process|N |当前步骤的状态，可选值为wait、process、finish、error，若不配置则使用 Steps 的 current 自动指定|
|PC|icon   |String|       |N | 图标 |
|PC|title  |String|       |N | 标题 |
|PC|content|String|       |N | 内容 |

### Step Slots

| 平台| 插槽名称| 类型| 必传 | 说明 |
|-----|-----|-----|-----|-----|
| web| icon | String/Component | N | 图标 |
| web| titile | String/Component | N | 标题 |
| web| content | String/Component | N | 内容 |
| web| extra | String/Component | N | 额外内容 |
