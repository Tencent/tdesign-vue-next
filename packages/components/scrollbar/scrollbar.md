:: BASE_DOC ::

## API

### Scrollbar Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
ariaLabel | String | - | 视图层的 aria-label 文本 | N
autoExpand | Boolean | true | 滚动条 hover 时是否向外扩展（增加交互热区） | N
autoresize | Boolean | true | 容器尺寸是否响应变化 | N
container | Object | - | 设置滚动容器的最大高度/宽度。TS 类型：`{ height?:string \| number; maxHeight?: string \| number; width?: string \| number; maxWidth?: string \| number }` | N
disabled | Boolean | false | 禁止滚动 | N
id | String | - | 视图层的 ID | N
role | String | scrollbar | 视图层的 WAI-ARIA 角色 | N
step | Object | - | 滚动步长。TS 类型：`{ x?: number; y?: number}` | N
tabindex | String / Number | - | 包裹容器的 tabindex | N
thumbMinSize | Number | 20 | 滚动条滑块的最小尺寸（px） | N
viewClassName | String | - | 视图（内容区）的自定义类名 | N
visibility | String | hover | 滚动条的显示形式。可选项：always/hover/hide | N
wrapClassName | String | - | 包裹容器的自定义类名 | N
onScroll | Function |  | TS 类型：`({ scrollTop: number, scrollLeft: number }) => void`<br/>滚动时触发 | N

### Scrollbar Events

名称 | 参数 | 描述
-- | -- | --
scroll | `({ scrollTop: number, scrollLeft: number })` | 滚动时触发

### ScrollbarInstanceFunctions 组件实例方法

名称 | 参数 | 返回值 | 描述
-- | -- | -- | --
getValues | \- | `PositionValues` | 必需。获取包含完整滚动信息的视图对象。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/scrollbar/type.ts)。<br/>`interface PositionValues { left: number; top: number; scrollLeft: number; scrollTop: number; scrollWidth: number; scrollHeight: number; clientWidth: number; clientHeight: number }`<br/>
scrollTo | `ScrollToFn` | \- | 必需。滚动到一组特定坐标。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/scrollbar/type.ts)。<br/>`type ScrollToFn = { (x: number, y: number): void; (options: { top?: number; left?: number; behavior?: ScrollBehavior }): void; }`<br/>
scrollToEdge | `(position:PositionEdge) ` | \- | 必需。滚动到某一边。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/scrollbar/type.ts)。<br/>`type PositionEdge = "left"\|"right"\|"top"\|"bottom"`<br/>

### ScrollbarValues

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
PositionEdge | String | - | 滚动到某一边。可选项：left/right/top/bottom | N
PositionValues | Object | - | 获取包含完整滚动信息的视图对象。TS 类型：`{ left: number; top: number; scrollLeft: number; scrollTop: number; scrollWidth: number; scrollHeight: number; clientWidth: number; clientHeight: number }` | N
