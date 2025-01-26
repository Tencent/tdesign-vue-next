:: BASE_DOC ::

## API
### Breadcrumb Props

name | type | default | description | required
-- | -- | -- | -- | --
maxItemWidth | String | undefined | \- | N
options | Array | - | Typescript：`Array<TdBreadcrumbItemProps>` | N
separator | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
theme | String | light | options：light | N

### BreadcrumbItem Props

name | type | default | description | required
-- | -- | -- | -- | --
content | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
disabled | Boolean | - | \- | N
href | String | - | \- | N
icon | Slot / Function | - | prefix icon in breadcrumb item。Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
maxWidth | String | undefined | \- | N
replace | Boolean | false | \- | N
router | Object | - | Typescript：`any` | N
target | String | _self | options：_blank/_self/_parent/_top | N
to | String / Object | - | Typescript：`string \| Route` `interface Route { path?: string; name?: string; hash?: string; query?: RouteData; params?: RouteData }` `type RouteData = { [key: string]: string \| string[] }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/breadcrumb/type.ts) | N
onClick | Function | | Typescript：`(e: MouseEvent) => void`<br/>trigger on click | N

### BreadcrumbItem Events

name | params | description
-- | -- | --
click | `(e: MouseEvent)` | trigger on click