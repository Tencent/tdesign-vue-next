:: BASE_DOC ::

## API

### QRCode Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
bgColor | String | - | 二维码背景颜色 | N
borderless | Boolean | false | 是否有边框 | N
color | String | - | 二维码颜色 | N
icon | String | - | 二维码中图片的地址 | N
iconSize | Number / Object | 40 | 二维码中图片的大小。TS 类型：`number \| { width: number; height: number }` | N
level | String | M | 二维码纠错等级。可选项：L/M/Q/H | N
size | Number | 160 | 二维码大小 | N
status | String | active | 二维码状态。可选项：active/expired/loading/scanned。TS 类型：`QRStatus` `type QRStatus = "active" \| "expired" \| "loading" \| "scanned"`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/qrcode/type.ts) | N
statusRender | Slot / Function | - | 自定义状态渲染器。TS 类型：`(info:StatusRenderInfo) => TNode` `type StatusRenderInfo = {status:QRStatus;onRefresh?: () => void;}`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/qrcode/type.ts) | N
type | String | canvas | 渲染类型。可选项：canvas/svg | N
value | String | - | 扫描后的文本 | N
onRefresh | Function |  | TS 类型：`() => void`<br/>点击"点击刷新"的回调 | N

### QRCode Events

名称 | 参数 | 描述
-- | -- | --
refresh | \- | 点击"点击刷新"的回调
