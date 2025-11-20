:: BASE_DOC ::

## API
### Affix Props

name | type | default | description | required
-- | -- | -- | -- | --
container | String / Function | () => (() => window) | Typescript：`ScrollContainer`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
content | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
default | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
offsetBottom | Number | 0 | When the distance from the bottom of the container reaches the specified distance, the trigger is fixed | N
offsetTop | Number | 0 | When the distance from the top of the container reaches the specified distance, the trigger is fixed | N
zIndex | Number | - | \- | N
onFixedChange | Function |  | Typescript：`(affixed: boolean, context: { top: number }) => void`<br/> | N

### Affix Events

name | params | description
-- | -- | --
fixed-change | `(affixed: boolean, context: { top: number })` | \-
