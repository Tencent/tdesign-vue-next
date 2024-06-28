:: BASE_DOC ::

## API
### Watermark Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
alpha | Number | 1 | 水印整体透明度，取值范围 [0-1] | N
content | String / Slot / Function | - | 水印所覆盖的内容节点。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | 水印所覆盖的内容节点，同 `content`。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
height | Number | - | 水印高度 | N
isRepeat | Boolean | true | 水印是否重复出现 | N
lineSpace | Number | 16 | 行间距，只作用在多行（`content` 配置为数组）情况下 | N
movable | Boolean | false | 水印是否可移动 | N
moveInterval | Number | 3000 | 水印发生运动位移的间隙，单位：毫秒 | N
offset | Array | - | 水印在画布上绘制的水平和垂直偏移量，正常情况下水印绘制在中间位置，即 `offset = [gapX / 2, gapY / 2]`。TS 类型：`Array<number>` | N
removable | Boolean | true | 水印是否可被删除 | N
rotate | Number | -22 | 水印旋转的角度，单位 ° | N
watermarkContent | Object / Array | - | 水印内容，需要显示多行情况下可配置为数组。TS 类型：`WatermarkText\|WatermarkImage\|Array<WatermarkText\|WatermarkImage>` | N
width | Number | - | 水印宽度 | N
x | Number | - | 水印之间的水平间距 | N
y | Number | - | 水印之间的垂直间距 | N
zIndex | Number | - | 水印元素的 `z-index`，默认值写在 CSS 中 | N

### WatermarkText

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
fontColor | String | rgba(0,0,0,0.1) | 水印文本文字颜色 | N
fontFamily | String | - | 水印文本文字字体 | N
fontSize | Number | 16 | 水印文本文字大小 | N
fontWeight | String | normal | 水印文本文字粗细。可选项：normal/lighter/bold/bolder | N
text | String | - | 水印文本内容 | N

### WatermarkImage

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
isGrayscale | Boolean | false | 水印图片是否需要灰阶显示 | N
url | String | - | 水印图片源地址，为了显示清楚，建议导出 2 倍或 3 倍图 | N
