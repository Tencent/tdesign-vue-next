:: BASE_DOC ::

## API

### Anchor Props

name | type | default | description | required
-- | -- | -- | -- | --
affixProps | Object | - | Typescript：`AffixProps`，[Affix API Documents](./affix?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/anchor/type.ts) | N
bounds | Number | 5 | \- | N
container | String / Function | () => (() => window) | Typescript：`ScrollContainer` | N
cursor | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
size | String | medium | options：small/medium/large。Typescript：`SizeEnum`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
targetOffset | Number | 0 | \- | N
onChange | Function |  | Typescript：`(currentLink: string, prevLink: string) => void`<br/> | N
onClick | Function |  | Typescript：`(link: { href: string; title: string; e: MouseEvent }) => void`<br/> | N

### Anchor Events

name | params | description
-- | -- | --
change | `(currentLink: string, prevLink: string)` | \-
click | `(link: { href: string; title: string; e: MouseEvent })` | \-

### AnchorItem Props

name | type | default | description | required
-- | -- | -- | -- | --
href | String | - | required | Y
target | String | _self | options：_self/_blank/_parent/_top | N
title | String / Slot / Function | '' | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
customScroll | Boolean | false | Custom scroll effect: When set to true, clicking on an anchor link will not use JavaScript animation to smoothly scroll to the anchor target element.

### AnchorTarget Props

name | type | default | description | required
-- | -- | -- | -- | --
id | String | - | required | Y
tag | String | div | \- | N
