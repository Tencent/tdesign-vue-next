:: BASE_DOC ::

## API
### ImageViewer Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
closeBtn | Boolean / Slot / Function | true | 是否展示关闭按钮，值为 `true` 显示默认关闭按钮；值为 `false` 则不显示关闭按钮；也可以完全自定义关闭按钮。TS 类型：`boolean \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
closeOnEscKeydown | Boolean | true | 按下 ESC 时是否触发图片预览器关闭事件 | N
closeOnOverlay | Boolean | - | 是否在点击遮罩层时，触发预览关闭 | N
draggable | Boolean | undefined | 是否允许拖拽调整位置。`mode=modal` 时，默认不允许拖拽；`mode=modeless` 时，默认允许拖拽 | N
imageScale | Object | - |  图片缩放相关配置。`imageScale.max` 缩放的最大比例；`imageScale.min` 缩放的最小比例；`imageScale.step` 缩放的步长速度; `imageScale.defaultScale` 默认的缩放比例。TS 类型：`ImageScale` `interface ImageScale { max: number; min: number; step: number; defaultScale?: number; }`。[详细类型定义](https://github.com/Tencent/tdesign-vue/tree/develop/src/image-viewer/type.ts) | N
images | Array | [] | 图片数组。`mainImage` 表示主图，必传；`thumbnail` 表示缩略图，如果不存在，则使用主图显示；`download` 是否允许下载图片，默认允许下载。示例: `['img_url_1', 'img_url_2']`，`[{ thumbnail: 'small_image_url', mainImage: 'big_image_url', download: false }]`。TS 类型：`Array<string \| File \| ImageInfo>` `interface ImageInfo { mainImage: string \| File; thumbnail?: string \| File; download?: boolean }`。[详细类型定义](https://github.com/Tencent/tdesign-vue/tree/develop/src/image-viewer/type.ts) | N
index | Number | 0 | 当前预览图片所在的下标。支持语法糖 `.sync` | N
defaultIndex | Number | 0 | 当前预览图片所在的下标。非受控属性 | N
mode | String | modal | 模态预览（modal）和非模态预览（modeless)。可选项：modal/modeless | N
navigationArrow | Boolean / Slot / Function | true | 切换预览图片的左图标，可自定义。TS 类型：`boolean \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
showOverlay | Boolean | undefined | 是否显示遮罩层。`mode=modal` 时，默认显示；`mode=modeless` 时，默认不显示 | N
title | String / Slot / Function | - | 预览标题。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
trigger | String / Slot / Function | - | 触发图片预览的元素，可能是一个预览按钮，可能是一张缩略图，完全自定义。TS 类型：`TNode \| TNode<{ open: () => void }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
viewerScale | Object | - | 限制预览器缩放的最小宽度和最小高度，仅 `mode=modeless` 时有效。TS 类型：`ImageViewerScale` `interface ImageViewerScale { minWidth: number; minHeight: number }`。[详细类型定义](https://github.com/Tencent/tdesign-vue/tree/develop/src/image-viewer/type.ts) | N
visible | Boolean | false | 隐藏/显示预览。支持语法糖 `v-model` | N
defaultVisible | Boolean | false | 隐藏/显示预览。非受控属性 | N
zIndex | Number | - | 层级，默认为 2000 | N
onClose | Function |  | TS 类型：`(context: { trigger: 'close-btn' \| 'overlay' \| 'esc'; e: MouseEvent \| KeyboardEvent }) => void`<br/>关闭时触发，事件参数包含触发关闭的来源：关闭按钮、遮罩层、ESC 键 | N
onIndexChange | Function |  | TS 类型：`(index: number, context: { trigger: 'prev' \| 'next' \| 'current' }) => void`<br/>预览图片切换时触发，`context.prev` 切换到上一张图片，`context.next` 切换到下一张图片 | N

### ImageViewer Events

名称 | 参数 | 描述
-- | -- | --
close | `(context: { trigger: 'close-btn' \| 'overlay' \| 'esc'; e: MouseEvent \| KeyboardEvent })` | 关闭时触发，事件参数包含触发关闭的来源：关闭按钮、遮罩层、ESC 键
index-change | `(index: number, context: { trigger: 'prev' \| 'next' \| 'current' })` | 预览图片切换时触发，`context.prev` 切换到上一张图片，`context.next` 切换到下一张图片
