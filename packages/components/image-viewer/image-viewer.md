:: BASE_DOC ::

## API

### ImageViewer Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
attach | String / Function | 'body' | 指定挂载节点。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body。TS 类型：`AttachNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
closeBtn | Boolean / Slot / Function | true | 是否展示关闭按钮，值为 `true` 显示默认关闭按钮；值为 `false` 则不显示关闭按钮；也可以完全自定义关闭按钮。TS 类型：`boolean \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
closeOnEscKeydown | Boolean | true | 按下 ESC 时是否触发图片预览器关闭事件 | N
closeOnOverlay | Boolean | - | 是否在点击遮罩层时，触发预览关闭 | N
draggable | Boolean | undefined | 是否允许拖拽调整位置。`mode=modal` 时，默认不允许拖拽；`mode=modeless` 时，默认允许拖拽 | N
imageReferrerpolicy | String | - | 图片预览中的 `<img>` 标签的原生属性，[MDN 定义](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy)。可选项：no-referrer/no-referrer-when-downgrade/origin/origin-when-cross-origin/same-origin/strict-origin/strict-origin-when-cross-origin/unsafe-url | N
imageScale | Object | - |  图片缩放相关配置。`imageScale.max` 缩放的最大比例；`imageScale.min` 缩放的最小比例；`imageScale.step` 缩放的步长速度; `imageScale.defaultScale` 默认的缩放比例。TS 类型：`Partial<ImageScale>` `interface ImageScale { max: number; min: number; step: number; defaultScale: number; }`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/image-viewer/type.ts) | N
images | Array | [] | 图片数组。`mainImage` 表示主图，必传；`thumbnail` 表示缩略图，如果不存在，则使用主图显示；`download` 是否允许下载图片，默认允许下载。示例: `['img_url_1', 'img_url_2']`，`[{ thumbnail: 'small_image_url', mainImage: 'big_image_url', download: false }]`。TS 类型：`Array<string \| File \| ImageInfo>` `interface ImageInfo { mainImage: string \| File; thumbnail?: string \| File; download?: boolean; isSvg?: boolean }`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/image-viewer/type.ts) | N
index | Number | 0 | 当前预览图片所在的下标。支持语法糖 `v-model:index` | N
defaultIndex | Number | 0 | 当前预览图片所在的下标。非受控属性 | N
mode | String | modal | 模态预览（modal）和非模态预览（modeless)。可选项：modal/modeless | N
navigationArrow | Boolean / Slot / Function | true | 切换预览图片的左图标，可自定义。TS 类型：`boolean \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
showOverlay | Boolean | undefined | 是否显示遮罩层。`mode=modal` 时，默认显示；`mode=modeless` 时，默认不显示 | N
title | String / Slot / Function | - | 预览标题。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
trigger | String / Slot / Function | - | 触发图片预览的元素，可能是一个预览按钮，可能是一张缩略图，完全自定义，默认为预览图片的缩略图。TS 类型：`TNode \| TNode<{ open: (index?: number) => void }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
viewerScale | Object | - | 限制预览器缩放的最小宽度和最小高度，仅 `mode=modeless` 时有效。TS 类型：`ImageViewerScale` `interface ImageViewerScale { minWidth: number; minHeight: number }`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/image-viewer/type.ts) | N
visible | Boolean | false | 隐藏/显示预览。支持语法糖 `v-model` 或 `v-model:visible` | N
defaultVisible | Boolean | false | 隐藏/显示预览。非受控属性 | N
zIndex | Number | - | 层级，默认为 3000 | N
onClose | Function |  | TS 类型：`(context: { trigger: 'close-btn' \| 'overlay' \| 'esc'; e: MouseEvent \| KeyboardEvent }) => void`<br/>关闭时触发，事件参数包含触发关闭的来源：关闭按钮、遮罩层、ESC 键 | N
onDownload | Function |  | TS 类型：`(url: string \| File) => void`<br/>自定义预览图片下载操作，url为图片链接 | N
onIndexChange | Function |  | TS 类型：`(index: number, context: { trigger: 'prev' \| 'next' \| 'current' }) => void`<br/>预览图片切换时触发，`context.prev` 切换到上一张图片，`context.next` 切换到下一张图片 | N

### ImageViewer Events

名称 | 参数 | 描述
-- | -- | --
close | `(context: { trigger: 'close-btn' \| 'overlay' \| 'esc'; e: MouseEvent \| KeyboardEvent })` | 关闭时触发，事件参数包含触发关闭的来源：关闭按钮、遮罩层、ESC 键
download | `(url: string \| File)` | 自定义预览图片下载操作，url为图片链接
index-change | `(index: number, context: { trigger: 'prev' \| 'next' \| 'current' })` | 预览图片切换时触发，`context.prev` 切换到上一张图片，`context.next` 切换到下一张图片
