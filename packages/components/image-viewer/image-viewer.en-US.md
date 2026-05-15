:: BASE_DOC ::

## API

### ImageViewer Props

name | type | default | description | required
-- | -- | -- | -- | --
attach | String / Function | 'body' | Typescript: `AttachNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
closeBtn | Boolean / Slot / Function | true | Typescript: `boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
closeOnEscKeydown | Boolean | true | trigger image viewer close event on `ESC` keydown | N
closeOnOverlay | Boolean | - | \- | N
draggable | Boolean | undefined | \- | N
imageReferrerpolicy | String | - | attribute of `<img>`, [MDN Definition](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy)。options: no-referrer/no-referrer-when-downgrade/origin/origin-when-cross-origin/same-origin/strict-origin/strict-origin-when-cross-origin/unsafe-url | N
imageScale | Object | - | Typescript: `Partial<ImageScale>` `interface ImageScale { max: number; min: number; step: number; defaultScale: number; }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/image-viewer/type.ts) | N
images | Array | [] | Typescript: `Array<string \| File \| ImageInfo>` `interface ImageInfo { mainImage: string \| File; thumbnail?: string \| File; download?: boolean; isSvg?: boolean }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/image-viewer/type.ts) | N
index | Number | 0 | `v-model:index` is supported | N
defaultIndex | Number | 0 | uncontrolled property | N
mode | String | modal | options: modal/modeless | N
navigationArrow | Boolean / Slot / Function | true | Typescript: `boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
showOverlay | Boolean | undefined | \- | N
title | String / Slot / Function | - | preview title。Typescript: `string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
trigger | String / Slot / Function | - | trigger element。Typescript: `TNode \| TNode<{ open: (index?: number) => void }>`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
viewerScale | Object | - | Typescript: `ImageViewerScale` `interface ImageViewerScale { minWidth: number; minHeight: number }`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/image-viewer/type.ts) | N
visible | Boolean | false | hide or show image viewer。`v-model` and `v-model:visible` is supported | N
defaultVisible | Boolean | false | hide or show image viewer。uncontrolled property | N
zIndex | Number | - | \- | N
onClose | Function |  | Typescript: `(context: { trigger: 'close-btn' \| 'overlay' \| 'esc'; e: MouseEvent \| KeyboardEvent }) => void`<br/> | N
onDownload | Function |  | Typescript: `(url: string \| File) => void`<br/> | N
onIndexChange | Function |  | Typescript: `(index: number, context: { trigger: 'prev' \| 'next' \| 'current' }) => void`<br/> | N

### ImageViewer Events

name | params | description
-- | -- | --
close | `(context: { trigger: 'close-btn' \| 'overlay' \| 'esc'; e: MouseEvent \| KeyboardEvent })` | \-
download | `(url: string \| File)` | \-
index-change | `(index: number, context: { trigger: 'prev' \| 'next' \| 'current' })` | \-
