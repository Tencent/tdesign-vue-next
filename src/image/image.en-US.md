:: BASE_DOC ::

## API
### Image Props

name | type | default | description | required
-- | -- | -- | -- | --
alt | String | - | \- | N
error | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
fit | String | fill | options：contain/cover/fill/none/scale-down | N
gallery | Boolean | false | \- | N
lazy | Boolean | false | \- | N
loading | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
overlayContent | String / Slot / Function | - | overlay on the top of image。Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
overlayTrigger | String | always | options：always/hover | N
placeholder | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
position | String | center | \- | N
shape | String | square | options：circle/round/square | N
src | String | - | \- | N
onError | Function |  | Typescript：`(context: { e: ImageEvent }) => void`<br/>trigger on image load failed | N
onLoad | Function |  | Typescript：`(context: { e: ImageEvent }) => void`<br/>trigger on image loaded | N

### Image Events

name | params | description
-- | -- | --
error | `(context: { e: ImageEvent })` | trigger on image load failed
load | `(context: { e: ImageEvent })` | trigger on image loaded
