:: BASE_DOC ::

## API
### BackTop Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
fixed | Boolean | true | 是否绝对定位固定到屏幕右下方 | N
icon | Slot / Function | 'backtop' | 图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/common.ts) | N
target | Function | - | 定位滚动到指定对象。TS 类型：`() => HTMLElement` | N
text | Slot / String | '' | 文案 | N
shape | String | 'circle' | 预设的样式类型。可选项：`circle` / `square` | N
visibility-height | number | 200 | 滚动高度达到此参数值才出现
onToTop | Function |  | TS 类型：`() => void`<br/>点击触发 | N

### BackTop Events

名称 | 参数 | 描述
-- | -- | --
to-top | - | 点击触发
