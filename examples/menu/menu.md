## Menu 导航菜单

用于承载网站的架构，并提供跳转的菜单列表

## 何时使用
导航菜单是整个网站的必要元素，可根据业务场景使用不同的导航样式和布局

关于导航的页面布局，可参考【布局Layout】

## 1.组件类型
### 1.1.顶部导航
#### 1）单层导航

定义：只存在单层结构的顶部导航，点击即跳转

使用场景：可承载单一产品或单一业务线等层级结构简单的网站

::: demo demos/head-menu 白色主题
:::

::: demo demos/head-menu-dark 黑色主题
:::

::: demo demos/head-menu-logo 只有LOGO插槽
:::

::: demo demos/head-menu-empty 只有MENU
:::

#### 2）双层导航

::: demo demos/head-menu-tile
:::

#### 3）多层收纳导航

::: demo demos/head-menu-dropdown
:::

#### 4）可自定义顶部导航
定义：可在原有导航上面加入自定义的功能

使用场景：复杂逻辑或有特定诉求的业务场景

::: demo demos/head-menu-options
:::

### 1.2.侧边导航
#### 1）单层导航

定义：只存在单层结构的侧边导航，点击即跳转

使用场景：一般与单层顶部导航相结合，作为二级页面的侧边导航

::: demo demos/side-menu 侧边栏菜单
:::

::: demo demos/side-menu-width 设置宽度
:::

::: demo demos/side-menu-group 分组菜单
:::

#### 2）平铺式侧边导航
定义：侧边导航可承载1-3级页面导航，并平铺展示

使用场景：层级较深，但每个层级内页面不多（5个以下）的网站，如结合单层顶部导航可承载最深四级页面

::: demo demos/side-menu-dropdown
:::

::: demo demos/side-menu-dropdown-icon
:::

::: demo demos/side-menu-popup 侧边菜单
:::

::: demo demos/side-menu-collapsed 侧边收起
:::

::: demo demos/side-menu-collapsed-width 侧边收起（自定义宽度）
:::

### Menu Props

| 平台  | 属性     | 类型                | 默认值  | 必传 | 说明      |
| ---- | -------- | ------------------ | ------ | ---- |  ---- |
| 公有 | theme  | String                | light  | N    | 内置样式：light、dark |
| 公有 | active | String/Number        |  -     | N     | 激活菜单项的name值  |
| 公有 | expand（开发中） | Array                 | []     | N    | 展开的SubMenu的集合 |
| 公有 | multiple（开发中） | Boolean                 | false     | N    | 是否开启多选模式，开启后每次至多展开一个子菜单 |
| 公有 | width | String                 | 256px    | N    | 仅侧边菜单有效 |
| 公有 | height | String                 | 100%    | N    | 侧边菜单高度 |
| 公有 | collapsed | Boolean                 | false     | N    | 是否收起侧边菜单 |
| 公有 | collapsed-width | String                 | 64px     | N    | 收起的侧边菜单宽度 |
| 公有 | mode（开发中） | String                 | accordion     | N    | 二级菜单类型、accordion为常规形式、popup为侧边气泡形式 |

### HeadMenu Props

| 平台  | 属性     | 类型                | 默认值  | 必传 | 说明      |
| ---- | -------- | ------------------ | ------ | ---- |  ---- |
| 公有 | theme  | String                | light  | N    | 内置样式：light、dark |
| 公有 | active | String/Number        |  -     | N     | 激活菜单项的name值  |
| 公有 | expand（开发中） | Array                 | []     | N    | 展开的SubMenu的集合 |
| 公有 | height | String                 | 60px    | N    | 菜单高度 |
| 公有 | mode | String                 | dropdown    | N    | 二级菜单类型、dropdown为下拉形式、tile为平铺 |

### Menu Events

关于事件名称，vue 不加 on，react 加 on。

示例：`change` for vue. `onChange` for react.

| 平台 | 事件名称 | 参数 | 说明               | 返回值               |
| ---- | -------- | ---- | ------------------ | ------------------ |
| 公有 | change    | -    | 选择菜单（MenuItem）时触发 | 选中的（MenuItem）的name值 |
| 公有 | expand（开发中）    | -    | 当 展开/收起 SubMenu时触发     | 当前展开的SubMenu的name值数组     |

### Menu Slots

| 平台 | 插槽名称 | 说明 |
| ---- | -------- | ---- |
| 公有 | default    | 默认插槽    |
| 公有 | logo    |  logo插槽   |
| 公有 | options    |  选项插槽，侧边栏菜单底部功能区、横向菜单为右侧功能区   |

### SubMenu Props

| 平台  | 属性     | 类型                | 默认值  | 必传 | 说明      |
| ---- | -------- | ------------------ | ------ | ---- |  ---- |
| 公有 | mode  |     String      | -  | dropdown    | 子菜单展示形式，dropdown为下拉式、popup为侧拉式 |
| 公有 | name  |     String/Number      | -  | Y    | 子菜单唯一标识 |
| 公有 | disabled  |     Boolean      | -  | N    | 子菜单是否禁用 |

### SubMenu Slots

| 平台 | 插槽名称 | 说明 |
| ---- | -------- | ---- |
| 公有 | default    | 默认插槽    |

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
| 公有 | target（开发中）  | String                | _self  | N  | 相当于 a 链接的 target 属性 |
| 公有 | disabled  | Boolean                | false  | N  | 是否禁用菜单项 |

### MenuItem Slots

| 平台 | 插槽名称 | 说明 |
| ---- | -------- | ---- |
| 公有 | default    | 默认插槽    |
| 公有 | icon    | icon插槽    |