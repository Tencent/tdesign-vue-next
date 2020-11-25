## steps 

提示用户进度以及当前的步骤，用于引导用户按照步骤完成任务的导航条。

### 何时使用：

页面内容较多，需要分步骤完成，通过流程导向显示进展，让用户对整个流程有所预期；

任务无法一次完成，或存在多人流转情况，需要展示任务进度以及当前步骤。

### 1. 组件类型

在TDesign中，拥有 5 种不同形式的步骤条：

### 1.1 水平步骤条——带序号

使用场景：适用于步骤数较少时，主要引导用户按步骤完成操作。


::: demo demos/horizontal 
:::


### 1.2 水平步骤条——不带序号

使用场景：适用于需要用水平步骤条，且步骤数较多的情况

::: demo demos/horizontal-dot 
:::

### 1.3 垂直步骤条——带序号

使用场景：适用于步骤较多、步骤提示内容较长、时间轴展示、或移动端的窄屏场景，以垂直方向排列步骤。

::: demo demos/vertical 
:::

### 1.4 垂直步骤条——不带序号

使用场景：适用于垂直步骤较多的情况。

::: demo demos/vertical-dot 
:::


### 1.5 带额外内容步骤条

使用场景: 适用于步骤中需要额外操作，等待下一步操作场景。

::: demo demos/extra 
:::


### 1.6 步骤状态

完整的流程包含3种步骤：已完成、进行中、未完成。

::: demo demos/status 
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
