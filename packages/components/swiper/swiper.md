:: BASE_DOC ::

## API

### Swiper Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
animation | String | slide | 轮播切换动画效果类型：滑动、淡入淡出等。可选项：slide/fade | N
autoplay | Boolean | true | 是否自动播放 | N
cardScale | Number | 210/332 | 卡片模式下非当前展示轮播图的缩放比例 | N
current | Number | 0 | 当前轮播在哪一项（下标）。支持语法糖 `v-model` 或 `v-model:current` | N
defaultCurrent | Number | 0 | 当前轮播在哪一项（下标）。非受控属性 | N
direction | String | horizontal | 轮播滑动方向，包括横向滑动和纵向滑动两个方向。可选项：horizontal/vertical | N
duration | Number | 300 | 滑动动画时长 | N
height | Number | - | 当使用垂直方向滚动时的高度 | N
interval | Number | 5000 | 轮播间隔时间 | N
loop | Boolean | true | 是否循环播放 | N
navigation | Object / Slot / Function | - | 导航器全部配置。TS 类型：`SwiperNavigation \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
stopOnHover | Boolean | true | 是否悬浮时停止轮播 | N
trigger | String | hover | 触发切换的方式：悬浮、点击等。可选项：hover/click | N
type | String | default | 样式类型：默认样式、卡片样式。可选项：default/card | N
onChange | Function |  | TS 类型：`(current: number, context: { source: SwiperChangeSource }) => void`<br/>轮播切换时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/swiper/type.ts)。<br/>`type SwiperChangeSource = 'autoplay' \| 'click' \| 'hover'`<br/> | N

### Swiper Events

名称 | 参数 | 描述
-- | -- | --
change | `(current: number, context: { source: SwiperChangeSource })` | 轮播切换时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/swiper/type.ts)。<br/>`type SwiperChangeSource = 'autoplay' \| 'click' \| 'hover'`<br/>

### SwiperNavigation

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
placement | String | inside | 导航器位置，位于主体的内侧或是外侧。可选项：inside/outside | N
showSlideBtn | String | always | 何时显示导航器的翻页按钮：始终显示、悬浮显示、永不显示。可选项：always/hover/never | N
size | String | medium | 导航器尺寸。可选项：small/medium/large | N
type | String | - | 导航器类型，点状(dots)、点条状(dots-bar)、条状(bars)、分式(fraction)等。TS 类型：`SwiperNavigationType` `type SwiperNavigationType = 'dots' \| 'dots-bar' \| 'bars' \| 'fraction'`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/swiper/type.ts) | N
