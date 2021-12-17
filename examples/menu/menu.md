:: BASE_DOC ::

### 可设置宽度的侧边导航

通过 `width` 设置侧边导航的宽度。

::: demo demos/side-menu-width menu
:::

## API

### Menu Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
collapsed | Boolean | false | 是否收起菜单 | N
expanded | Array | - | 展开的子菜单集合。支持语法糖。TS 类型：`Array<MenuValue>` | N
defaultExpanded | Array | - | 展开的子菜单集合。非受控属性。TS 类型：`Array<MenuValue>` | N
expandMutex | Boolean | false | 同级别互斥展开 | N
expandType | String | normal | 二级菜单展开方式，平铺展开和浮层展开。可选项：normal/popup | N
logo | Slot / Function | - | 站点 LOGO。TS 类型：`TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
operations | Slot / Function | - | 导航操作区域。TS 类型：`TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
theme | String | light | 菜单风格。可选项：light/dark | N
value | String / Number | - | 激活菜单项。支持语法糖。TS 类型：`MenuValue`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/menu/type.ts) | N
defaultValue | String / Number | - | 激活菜单项。非受控属性。TS 类型：`MenuValue`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/menu/type.ts) | N
width | String / Number / Array | '232px' | 菜单宽度。值类型为数组时，分别表示菜单展开和折叠的宽度。[ 展开时的宽度, 折叠时的宽度 ]，示例：['200px', '80px']。TS 类型：`string | number | Array<string | number>` | N
onChange | Function |  | 激活菜单项发生变化时触发。`(value: MenuValue) => {}` | N
onCollapsed | Function |  | 侧边栏导航展开/收起发生变化时触发。`(options: { collapsed: boolean; e?: MouseEvent }) => {}` | N
onExpand | Function |  | 展开的菜单项发生变化时触发。`(value: Array<MenuValue>) => {}` | N

### Menu Events

名称 | 参数 | 描述
-- | -- | --
change | `(value: MenuValue)` | 激活菜单项发生变化时触发
collapsed | `(options: { collapsed: boolean; e?: MouseEvent })` | 侧边栏导航展开/收起发生变化时触发
expand | `(value: Array<MenuValue>)` | 展开的菜单项发生变化时触发

### HeadMenu Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
expanded | Array | - | 展开的子菜单集合。支持语法糖。TS 类型：`Array<MenuValue>` | N
defaultExpanded | Array | - | 展开的子菜单集合。非受控属性。TS 类型：`Array<MenuValue>` | N
expandType | String | normal | 二级菜单展开方式，平铺展开和浮层展开。可选项：normal/popup | N
logo | Slot / Function | - | 站点 LOGO。TS 类型：`TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
operations | Slot / Function | - | 导航操作区域。TS 类型：`TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
theme | String | light | 可选项：light/dark | N
value | String / Number | - | 激活菜单项。支持语法糖。TS 类型：`MenuValue`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/menu/type.ts) | N
defaultValue | String / Number | - | 激活菜单项。非受控属性。TS 类型：`MenuValue`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/menu/type.ts) | N
onChange | Function |  | 激活菜单项发生变化时触发。`(value: MenuValue) => {}` | N
onExpand | Function |  | 展开的菜单项发生变化时触发。`(value: Array<MenuValue>) => {}` | N

### HeadMenu Events

名称 | 参数 | 描述
-- | -- | --
change | `(value: MenuValue)` | 激活菜单项发生变化时触发
expand | `(value: Array<MenuValue>)` | 展开的菜单项发生变化时触发

### Submenu Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
content | String / Slot / Function | - | 菜单项内容。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | 菜单项内容，同 content。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
disabled | Boolean | - | 是否禁用菜单项展开/收起/跳转等功能 | N
icon | Slot / Function | - | 菜单项图标。TS 类型：`TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
title | String / Slot / Function | - | 二级菜单内容。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
value | String / Number | - | 菜单项唯一标识。TS 类型：`MenuValue` | N

### MenuItem Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
content | String / Slot / Function | - | 菜单项内容。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | 菜单项内容，同 content。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
disabled | Boolean | - | 是否禁用菜单项展开/收起/跳转等功能 | N
href | String | - | 跳转链接 | N
icon | Slot / Function | - | 图标。TS 类型：`TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
replace | Boolean | false | 路由跳转是否采用覆盖的方式（覆盖后将没有浏览器历史记录） | N
router | Object | - | 路由对象。如果项目存在 Router，则默认使用 Router。。TS 类型：`Record<string, any>` | N
target | String | - | 链接或路由跳转方式。可选项：_blank/_self/_parent/_top | N
to | String / Object | - | 路由跳转目标，当且仅当 Router 存在时，该 API 有效。TS 类型：`MenuRoute`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/menu/type.ts) | N
value | String / Number | - | 菜单项唯一标识。TS 类型：`MenuValue` | N
onClick | Function |  | 点击时触发。`(context: { e: MouseEvent }) => {}` | N

### MenuItem Events

名称 | 参数 | 描述
-- | -- | --
click | `(context: { e: MouseEvent })` | 点击时触发

### MenuGroup Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
title | String / Slot / Function | - | 菜单组标题。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
