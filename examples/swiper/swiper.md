:: BASE_DOC ::
## API

### Swiper Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
animation | String | slide | 轮播切换动画效果类型。可选项：slide | N
autoplay | Boolean | true | 是否自动播放 | N
current | Number | - | 当前轮播在哪一项（下标）。支持语法糖 | N
defaultCurrent | Number | - | 当前轮播在哪一项（下标）。非受控属性 | N
direction | String | horizontal | 轮播滑动方向，包括横向滑动和纵向滑动两个方向。可选项：horizontal/vertical | N
duration | Number | 300 | 滑动动画时长 | N
interval | Number | 5000 | 轮播间隔时间 | N
onChange | Function |  | 轮播切换时触发。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/swiper/type.ts)。`(current: number, context: { source: SwiperChangeSource }) => {}` | N

### Swiper Events

名称 | 参数 | 描述
-- | -- | --
change | `(current: number, context: { source: SwiperChangeSource })` | 轮播切换时触发。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/swiper/type.ts)
