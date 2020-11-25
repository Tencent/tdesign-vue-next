## tabs 
用于承载同一层级下不同页面或类别的组件，方便用户在同一个页面框架下进行快速切换

### 何时使用

内容过多，需要将不同类型内容进行扁平化收纳

### 1.组件类型

### 1.1.简洁选项卡
定义：模块内的内容切换，操作后不会进行页面跳转

使用场景：常规使用场景

::: demo demos/base 默认
:::

### 1.2.带icon选项卡
定义：结合icon的选项卡，方便用户快速理解

使用场景：选项卡的内容寓意能够提取成icon的场景

::: demo demos/type 选项卡类型
:::

### 1.3.功能选项卡
定义：可自定义功能的选项卡，可加入不同的操作

使用场景：需要选项卡承载复杂操作（如下拉菜单、添加、删除等共功能）的场景


### 1.4.不同位置选项卡
定义：在模块中左右上下不同位置的选项卡

使用场景：空间有限，或有特殊诉求的场景

::: demo demos/position 选项卡位置
:::

### 1.5.带操作选项卡
定义：在整个选项卡模块右侧放置操作icon，以控制选项卡内容

使用场景：对选项卡有相应的操作（如添加、删除等功能）需求的场景

### 1.6功能选项卡与下划线组合

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
| activeName | String/Number | 0 | false | 初始化激活的选项卡name |
| size | String | "middle" | false | 选项卡尺寸：middle、large |
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