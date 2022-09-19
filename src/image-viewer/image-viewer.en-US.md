:: BASE_DOC ::

## API
### ImageViewer Props

name | type | default | description | required
-- | -- | -- | -- | --
closeBtn | Boolean / Slot / Function | true | Typescript：`boolean | TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
closeOnOverlay | Boolean | - | \- | N
draggable | Boolean | undefined | \- | N
imageScale | Object | - | Typescript：`ImageScale` `interface ImageScale { max: number; min: number; step: number }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/image-viewer/type.ts) | N
images | Array | [] | Typescript：`Array<string | ImageInfo>` `interface ImageInfo { mainImage: string; thumbnail?: string; download?: boolean }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/image-viewer/type.ts) | N
index | Number | - | `v-model:index` is supported | N
defaultIndex | Number | - | uncontrolled property | N
mode | String | modal | options：modal/modeless | N
navigationArrow | Boolean / Slot / Function | true | Typescript：`boolean | TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
showOverlay | Boolean | undefined | \- | N
title | String / Slot / Function | - | preview title。Typescript：`string | TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
trigger | String / Slot / Function | - | Typescript：`string | TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
viewerScale | Object | - | Typescript：`ImageViewerScale` `interface ImageViewerScale { minWidth: number; minHeight: number }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/image-viewer/type.ts) | N
visible | Boolean | false | `v-model` and `v-model:visible` is supported | N
defaultVisible | Boolean | false | uncontrolled property | N
zIndex | Number | - | \- | N
onClose | Function |  | Typescript：`(context: { trigger: 'close-btn' | 'overlay' | 'esc'; e: MouseEvent | KeyboardEvent }) => void`<br/> | N
onIndexChange | Function |  | Typescript：`(index: number, context: { trigger: 'prev' | 'next' }) => void`<br/> | N

### ImageViewer Events

name | params | description
-- | -- | --
close | `(context: { trigger: 'close-btn' | 'overlay' | 'esc'; e: MouseEvent | KeyboardEvent })` | \-
index-change | `(index: number, context: { trigger: 'prev' | 'next' })` | \-
