:: BASE_DOC ::

### 带跳转/点击的面包屑

自定义响应点击事件。

{{ href }}

## API
### Breadcrumb Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
ellipsis | String / Slot / Function | - | 自定义折叠时省略号的内容。其中，`items`为被省略的内容合集，`separator`为分隔符。TS 类型：`string \| TNode<{ items: Array<TdBreadcrumbItemProps>, separator: TdBreadcrumbProps['separator'] }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
itemsAfterCollapse | Number | undefined | 超过面包屑最大显示数量时，省略号后显示几项。`maxItems > 0`时有效 | N
itemsBeforeCollapse | Number | undefined | 超过面包屑最大显示数量时，省略号前显示几项。`maxItems > 0`时有效 | N
maxItemWidth | String | undefined | 单项最大宽度，超出后会以省略号形式呈现 | N
maxItems | Number | undefined | 显示的面包屑的最大数量，超出该值后中间的面包屑内容将会显示为省略号。值`<= 0`代表不限制。需要同时配置`itemsBeforeCollapse`和`itemsAfterCollapse` | N
options | Array | - | 面包屑项，功能同 BreadcrumbItem。TS 类型：`Array<TdBreadcrumbItemProps>` | N
separator | String / Slot / Function | - | 自定义分隔符。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
theme | String | light | 组件风格。可选项：light | N

### BreadcrumbItem Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
content | String / Slot / Function | - | 子元素。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
default | String / Slot / Function | - | 子元素，同 content。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
disabled | Boolean | - | 是否禁用当前项点击 | N
href | String | - | 跳转链接，不能与 to 共用 | N
icon | Slot / Function | - | 面板屑项内的前置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
maxWidth | String | undefined | 最大宽度，超出后会以省略号形式呈现。优先级高于 Breadcrumb 中的 maxItemWidth | N
replace | Boolean | false | 路由跳转是否采用覆盖的方式（覆盖后将没有浏览器历史记录） | N
router | Object | - | 路由对象。如果项目存在 Router，则默认使用 Router。TS 类型：`any` | N
target | String | _self | 链接或路由跳转方式。可选项：_blank/_self/_parent/_top | N
to | String / Object | - | 路由跳转目标，当且仅当 Router 存在时，该 API 有效。不能与 href 共用。TS 类型：`string \| Route` `interface Route { path?: string; name?: string; hash?: string; query?: RouteData; params?: RouteData }` `type RouteData = { [key: string]: string \| string[] }`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/breadcrumb/type.ts) | N
onClick | Function |  | TS 类型：`(e: MouseEvent) => void`<br/>点击时触发 | N

### BreadcrumbItem Events

名称 | 参数 | 描述
-- | -- | --
click | `(e: MouseEvent)` | 点击时触发
