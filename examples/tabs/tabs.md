:: BASE_DOC ::

### 尺寸
::: demo demos/size
:::

### 选项卡禁止点击
::: demo demos/ban 
:::

### 属性配置
#### tabs
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
| theme | String | "normal" | false | 选项卡类型：nomral、card |
| activeName | String/Number | 0 | false | 初始化激活的选项卡name |
| size | String | "medium" | false | 选项卡尺寸：medium、large |
| tabPosition | String | "top" | false | 选项卡位置：top、right、bottom、left |
| addable | Boolean | false | false | 是否显示添加按钮 |

#### tab-panel
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
| name | String/Number | 0 | true | 选项板name，不可重复 |
| label | String | "" | false | 选项卡显示名称 |
| disabled | Boolean | false | false | 选项卡是否禁用 |
| closable | Boolean | false | false | 选项卡是否可移除 |
| forceRender | Boolean | false | false | 选项板强制渲染 |

#### Events
| 事件名称 | 参数 | 说明 |
|-----|-----|-----|
| change | name: string | 点击选项卡 |
| add | / | 点击添加选项卡button |
| remove | name: string | 点击单个选项卡的删除button |