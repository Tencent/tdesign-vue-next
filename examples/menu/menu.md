## Menu 导航菜单

### 顶部导航

::: demo demos/head-menu 白色主题
:::

::: demo demos/head-menu-dark 黑色主题
:::

### 侧边导航

::: demo demos/base 侧边栏菜单
:::

### Menu Props

| 平台  | 属性     | 类型                | 默认值  | 必传 | 说明      |
| ---- | -------- | ------------------ | ------ | ---- |  ---- |
| 公有 | theme  | String                | light  | N    | 内置样式：light、dark |
| 公有 | active | String/Number        |  -     | N     | 激活菜单项的name值  |
| 公有 | expand | Array                 | []     | N    | 展开的SubMenu的集合 |
| 公有 | multiple | Booean                 | false     | N    | 是否开启多选模式，开启后每次至多展开一个子菜单 |
| 公有 | width | String                 | 256px    | N    | 仅侧边栏有效 |
| 公有 | collapsed | Boolean                 | false     | N    | 是否收起侧边栏 |
| 公有 | collapsed-width | String                 | 64px     | N    | 收起的侧边栏宽度 |
| 公有 | mode | String                 | accordion     | N    | 二级菜单类型、accordion为常规形式、popup为侧边气泡形式 |

### HeadMenu Props

| 平台  | 属性     | 类型                | 默认值  | 必传 | 说明      |
| ---- | -------- | ------------------ | ------ | ---- |  ---- |
| 公有 | theme  | String                | light  | N    | 内置样式：light、dark |
| 公有 | active | String/Number        |  -     | N     | 激活菜单项的name值  |
| 公有 | expand | Array                 | []     | N    | 展开的SubMenu的集合 |
| 公有 | height | String                 | 60px    | N    | 菜单高度 |
| 公有 | mode | String                 | dropdown    | N    | 二级菜单类型、dropdown为下拉形式、tile为平铺 |

### Menu Events

关于事件名称，vue 不加 on，react 加 on。

示例：`change` for vue. `onChange` for react.

| 平台 | 事件名称 | 参数 | 说明               | 返回值               |
| ---- | -------- | ---- | ------------------ | ------------------ |
| 公有 | change    | -    | 选择菜单（MenuItem）时触发 | 选中的（MenuItem）的name值 |
| 公有 | expand    | -    | 当 展开/收起 SubMenu时触发     | 当前展开的SubMenu的name值数组     |

### Menu Slots

| 平台 | 插槽名称 | 说明 |
| ---- | -------- | ---- |
| 公有 | default    | 默认插槽    |
| 公有 | logo    |  logo插槽   |
| 公有 | options    |  选项插槽，侧边栏菜单底部功能区、横向菜单为右侧功能区   |

### SubMenu Props

| 平台  | 属性     | 类型                | 默认值  | 必传 | 说明      |
| ---- | -------- | ------------------ | ------ | ---- |  ---- |
| 公有 | name  |     String/Number      | -  | Y    | 子菜单唯一标识 |

### SubMenu Events

关于事件名称，vue 不加 on，react 加 on。

示例：`change` for vue. `onChange` for react.

| 平台 | 事件名称 | 参数 | 说明               | 返回值               |
| ---- | -------- | ---- | ------------------ | ------------------ |
| 公有 | collapsed    | -    | 收起时触发，返回是否收起状态     | 收起时触发，返回是否收起状态     |

### MenuGroup Props

| 平台  | 属性     | 类型                | 默认值  | 必传 | 说明      |
| ---- | -------- | ------------------ | ------ | ---- |  ---- |
| 公有 | title  | String                | -  | N    | 分组标题 |

### MenuItem Props

| 平台  | 属性     | 类型                | 默认值  | 必传 | 说明      |
| ---- | -------- | ------------------ | ------ | ---- |  ---- |
| 公有 | name  | String/Number                | -  | Y  | 菜单项的唯一标识 |
| 公有 | route  | String/Object              | -  | N  | 跳转的链接，支持 router 对象 |
| 公有 | target  | String                | _self  | N  | 相当于 a 链接的 target 属性 |
| 公有 | disabled  | Booean                | false  | N  | 是否禁用菜单项 |

### MenuItem Slots

| 平台 | 插槽名称 | 说明 |
| ---- | -------- | ---- |
| 公有 | default    | 默认插槽    |